# install redis-server in wsl2
sudo apt-get install redis


# Post redis install to run redis server
redis-server

# redis cli to run commands in the Command line interface
redis-cli 

## some important cli commands

keys myprefix*
keys *pattern*
keys *mysuffix



dump **key** Serialize key

del **key** Delete key
dump **key** Serialize key
exists **key** Check for key
**expire key seconds** Set key TTL
get **key**
set **key** **value**
setnx **key** **value** Set key value only if key does not exist

redis-cli INFO

# remove all keys from db
flushall 

# find Time to live of Key(TTL)
ttl **key**