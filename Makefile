all:start

BASH = docker exec -it wlb-common-front /bin/sh

define HELP
\n
command			|  definition
===============================================
>> start  		|  starts the docker container.
>> stop   		|  stops the docker container.
>> clean  		|  removes all the temp files, stops the docker and removes the docker images as well.
>> bash 		|  enter the docker Bash.
>> story 		|  start he storybook.
>> lint 		|  analyze the code for errors, bugs, stylistic errors and suspicious constructs.
>> lintfix  	|  formats the code based on Eslint + Pretty standards.
\n
endef
export HELP

help:
	@echo "$$HELP"

start:
	docker-compose -f ./docker-compose.yml up

start-prod:
	docker-compose -f ./docker-compose.prod.yml up

stop:
	docker-compose -f ./docker-compose.yml down

clean:
	rm -rf ./tmp
	rm -rf ./app/tmp
	docker-compose -f ./docker-compose.yml down --rmi all

bash:
	$(BASH)

story:
	$(BASH) -c 'yarn story'

lint:
	$(BASH) -c 'yarn lint'

lintfix:
	$(BASH) -c 'yarn lintfix'