log() {
  local level="$1"; shift
  local msg="[$(date '+%Y-%m-%d %H:%M:%S')] [$level] $*"
  echo "$msg"
  mkdir -p $LOG_DIR
  echo "$msg" >> $LOG_DIR/setup.log
}

log_info()    { log INFO "$@"; }
log_warn()    { log WARNING "$@"; }
log_success() { log SUCCESS "$@"; }
log_error()   { log ERROR "$@"; }