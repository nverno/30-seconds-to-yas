SHELL     := /bin/bash
AWK       ?= gawk                                 # old macOS awk won't work
JQ        ?= jq                                   # CLI JSON parser
CLIPBOARD ?= xclip -sel clip                      # command to copy to clipboard

REPO_URL  := $(shell git config --get remote.origin.url)
REPO_NAME := $(shell ${AWK} -F'com/' '{print $$2}' <<< ${REPO_URL})

NPM_REGISTY   =  registry.npmjs.org
NPM_LOG_LEVEL =  error

CI_CONFIG =  ${CURDIR}/.circleci/config.yml
CI_JOB    ?= build-and-test

.PHONY: all 
all: help ## No default targets
	@

.PHONY: npm-token
npm-token: ## Copy current npmjs registry authToken to clipboard
	@( set -eo pipefail; yarn config list --json | tail -n1 | \
	${JQ} -r ".data[\"//${NPM_REGISTY}/:_authToken\"]" | \
	${CLIPBOARD} && echo "Copied authToken to clipboard" ) 2>/dev/null \
	|| { echo "Failed to copy authToken" && true; } # don't fail either way

npm-login: npm-token ## Login to brmlia npmjs registry
	@npm login --scope @brmlia

## -------------------------------------------------------------------
### CI targets

.PHONY: browse-ci check-ci run-ci check-travis
browse-ci: ## Check circleci builds online
	@${BROWSER} https://circleci.com/gh/${REPO_NAME}

check-ci: ## Validates circleci configuration file locally
	@circleci config validate ${CURDIR}/.circleci/config.yml

run-ci: ## Run circleci locally -- requires docker/circleci setup
	circleci local execute --job ${CI_JOB}

dump-ci: ## Dump the result of processing circleci setup to stdout
	circleci config process ${CI_CONFIG}

check-travis: ## validate .travis.yml (requires 'gem install travis')
	@travis lint $(CURDIR)/.travis.yml

clean: ## Remove package-lock + any directories created during tests
	$(RM) -r coverage package-lock.json

.PHONY: clean-all
clean-all: clean ## Remove all caches + lock files
	$(RM) -r node_modules yarn.lock .pnp/ .pnp.js

.PHONY: help
help:  ## Display this help message
	@for mfile in $(MAKEFILE_LIST); do                  \
	  grep -E '^[a-zA-Z_%-]+:.*?## .*$$' $$mfile |      \
	  sort | ${AWK}                                     \
	  'BEGIN {FS = ":.*?## "};                          \
	   {printf "\033[36m%-15s\033[0m %s\n", $$1, $$2}'; \
	done
