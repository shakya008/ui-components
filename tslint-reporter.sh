#!/bin/bash
#################################################################################################
# This script checkout the branch and take pull on that branch. 
# Execute the npm tslint task and counts the lint error by counting the number of error lines.
# Adds the number of lint error in log file with time stamp
# NOTE: To run script perodically, add it in crobtab
################################################################################################
MY_PATH=`dirname "$0"`
MY_PATH=`( cd "$MY_PATH" && pwd )`

cd $MY_PATH
# Checkout the branch for which tslint issues checking
git checkout dev
# Update the branch
git pull origin dev

OUTPUT="$(npm run lint-ts | wc -l)"
DATE="$(date '+%Y-%m-%d %H:%M:%S')"
echo $OUTPUT $DATE >> $MY_PATH/tslint-report.txt

prev_file=$MY_PATH/prev_file.txt
curr_file=$MY_PATH/curr_file.txt
added_issues=$MY_PATH/added_issues.txt

npm run lint-ts | grep "^ERROR" | sort > $curr_file

if [ -f  $prev_file ] ; then
    echo 'START-------------------' $DATE '------------------------' >> $added_issues
    cat $curr_file  | while read -r line
    do
        if ! grep -Fxq "$line" "$prev_file";then
            echo "$line" >> $added_issues
        fi
    done
    echo 'END-------------------' $DATE '------------------------\n' >> $added_issues
fi

mv  $curr_file $prev_file


## To run via crontab, set in crontab
# 0 1 * * * sh /home/anil/projects/expertlyGit/client/webapp/tslint-reporter.sh >/dev/null 2>&1
# Reference to set cron time:
# https://crontab.guru/ 
# https://en.wikipedia.org/wiki/Cron

# TO check crontab log, open /var/log/syslog