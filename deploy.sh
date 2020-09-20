docker pull utsavoz/magnum_opus
docker stop magnum_opus_container
docker container rm magnum_opus_container
docker run -dit -p 80:80 --name magnum_opus_container magnum_opus
