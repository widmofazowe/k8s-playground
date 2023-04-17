function wf {
  local command=$1
  if [[ $# > 0 ]]; then
    shift
  fi

  case "$command" in
    "build") wf-build-command $* ;;
    "")
      local PURPLE='\033[0;35m'
      local NC='\033[0m' # No Color
      local targetContext=`kc config current-context`
      echo "Active cluster: ${PURPLE}${targetContext}${NC}\n"

      echo "Usage: wf <build>" ;;
    *)
      echo "Unknown command: $command"
  esac
}

function wf-build-command {
  local imageName=$1
  local version=$2

  local PURPLE='\033[0;35m'
  local NC='\033[0m' # No Color

  aws ecr get-login-password --region eu-central-1 | docker login --username AWS --password-stdin 158778643921.dkr.ecr.eu-central-1.amazonaws.com
  docker build -t $imageName .
  docker tag $imageName:$version 158778643921.dkr.ecr.eu-central-1.amazonaws.com/$imageName:$version
  docker push 158778643921.dkr.ecr.eu-central-1.amazonaws.com/$imageName:$version
}