#!/bin/bash
echo "Starting deploy..."

echo "                                        00                                                                                                                                                            
000000000000      000000000000        000000      00000000                                                                                                                                            
  00000000          000000              0000        000000                                                                                                                                            
    0000            0000                            000000                                                                                                                                            
    0000          0000                              000000                                                                                                                                            
    0000        0000                                000000                                                                                                                                            
    0000      0000                      0000        000000              000000                                                                                                                        
    0000    0000                    00000000        000000          0000    000000                                                                                                                    
    0000000000                        000000        000000        0000        000000                                                                                                                  
    000000000000                      000000        000000      000000        000000                                                                                                                  
    00000000000000                    000000        000000      0000            000000                                                                                                                
    0000    00000000                    0000        000000      0000            000000                                                                                                                
    0000      00000000                  0000        000000      0000            000000                                                                                                                
    0000        00000000                0000        000000      000000          0000                                                                                                                  
    0000          00000000              0000        000000      000000          0000                                                                                                                  
    0000            00000000          000000        000000        0000          0000                                                                                                                  
  00000000          0000000000        000000        000000        000000      0000                                                                                                                    
000000000000      0000000000000000  0000000000    0000000000        000000000000  "

set -eu

export DEPLOY_DOCKER_MACHINE="conoha1" # Docker Machine Name

# Change docker context
eval $(docker-machine env $DEPLOY_DOCKER_MACHINE)

# Build
docker-compose -f docker-compose.prod.yml build --no-cache
docker-compose -f docker-compose.prod.yml up --force-recreate -d --no-deps --remove-orphans

# Reset docker context
eval $(docker-machine env -u)