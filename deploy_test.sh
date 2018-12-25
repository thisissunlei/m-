#!/bin/bash

#npm run build


buildEnvDir=$1
target_site=www@10.1.60.201
target_site_port=9830
environment_array=(www@10.1.60.201)

test01_ip=ali-docker-test01
test02_ip=ali-docker-test02
test03_ip=ali-docker-test03
test04_ip=ali-docker-test04
test05_ip=ali-docker-test05

case $1 in
  

  test01 )
    environment_array=(www@${test01_ip})
    target_site_port=22
  ;;

  test02 )
    environment_array=(www@${test02_ip})
    target_site_port=22
  ;;
  test03)
    environment_array=(www@${test03_ip})
    target_site_port=22
  ;;

  test04)
    environment_array=(www@${test04_ip})
    target_site_port=22
  ;;
  test05)
    environment_array=(www@${test05_ip})
    target_site_port=22
  ;;

  all)
    environment_array=(www@${test01_ip} www@${test02_ip} www@${test03_ip} www@${test04_ip} www@${test05_ip})
    target_site_port=22
  ;;

  *)
  environment_array=(www@10.1.60.201)
  target_site_port=9830
    

  ;;


esac

echo $1
echo $environment_array


for data in ${environment_array[@]}  
do  
     rsync -cza --delete-before  -e "ssh -p ${target_site_port}"  ./* ${data}:/data/work/frontend/kr-web-new/ >/dev/null  
done  
