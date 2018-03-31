#!/bin/bash
args="$@"
if [ -z "$args" ]; then 
	args='src/**/*.ts'
fi	
./node_modules/tslint/bin/tslint $args
exit 0
