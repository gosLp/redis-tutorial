#install redis-server in wsl2
sudo apt-get install redis


#Post redis install
redis-server

#redis cli to run commands in the Command line interface
redis-cli 

#some important cli commands

keys myprefix*
keys *pattern*
keys *mysuffix

del <key> Delete key
dump <key> Serialize key
exists <key> Check for key
expire <key> <seconds> Set key TTL
get <key>
set <key> <value>
setnx <key> <value> Set key value only if key does not exist

redis-cli INFO

#remove all keys from db
flushall 