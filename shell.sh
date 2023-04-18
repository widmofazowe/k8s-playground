TWEAK_SHELL_RELATIVE_PATH=${BASH_SOURCE[0]:-${(%):-%x}}
SPS_SHELL_DIR=$(dirname $(realpath $TWEAK_SHELL_RELATIVE_PATH))
SPS_PURPLE='\033[0;35m'
SPS_NC='\033[0m' # No Color

function sps {
  local command=$1
  if [[ $# > 0 ]]; then
    shift
  fi

  case "$command" in
    "build") sps-build-command $* ;;
    "deploy") sps-deploy-command $* ;;
    "")
      local PURPLE='\033[0;35m'
      local NC='\033[0m' # No Color
      local targetContext=`kc config current-context`
      echo "Active cluster: ${PURPLE}${targetContext}${NC}\n"

      echo "Usage: sps <build|deploy>" ;;
    *)
      echo "Unknown command: $command"
  esac
}

function sps-deploy-confirm {
  echo "Target cluster ${SPS_PURPLE}$(kc config current-context)${SPS_NC}"
  echo "Do you want to continue?"

  select opt in "Yes" "No (Abort)"; do
    echo "Picked: $opt"
    if [[ $opt != "Yes" ]]; then
      echo "Aborted..."
      return 1
    fi
    break;
  done

  return 0
}

function sps-deploy-command {
  echo "Deploying app ${SPS_PURPLE}sps${SPS_NC}"

  sps-deploy-confirm
  if [[ $? == 1 ]]; then
    return 1
  fi

  rm $SPS_SHELL_DIR/deploy/sps/charts/*.tgz
  helm dependency update $SPS_SHELL_DIR/deploy/sps
  helm upgrade -i \
    --history-max 10 \
    sps $SPS_SHELL_DIR/deploy/sps
}

function sps-build-command {
  local appName=$1
  local version=$2

  local PURPLE='\033[0;35m'
  local NC='\033[0m' # No Color

  echo "Building app ${SPS_PURPLE}$appName:$version${SPS_NC}"

  eval $(minikube docker-env)
  docker build -t $appName:$version $SPS_SHELL_DIR/$appName
}

function sps-aws-build-command {
  local imageName=$1
  local version=$2

  aws ecr get-login-password --region eu-central-1 | docker login --username AWS --password-stdin 158778643921.dkr.ecr.eu-central-1.amazonaws.com
  docker build -t $imageName .
  docker tag $imageName:$version 158778643921.dkr.ecr.eu-central-1.amazonaws.com/$imageName:$version
  docker push 158778643921.dkr.ecr.eu-central-1.amazonaws.com/$imageName:$version
}