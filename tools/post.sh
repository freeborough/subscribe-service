#!/bin/bash

curl -X POST http://localhost:3000/ -H 'Content-type: application/json' -d '{"email": "bilbo.baggins@bagend.com"}'
