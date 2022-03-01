import json
from prompt_conversions import *
# from api_keys import *
import openai

# event_body = '{"problem": "increase low income housing", "groupify": "market", "cognify": "sense", "technify": "null", "temperature": 0.8}'

# event = {
#   "body": event_body
# }

# print(event_body)
def handler(event, context):
  print("hi")
#   openai.organization = get_organization_key()
  openai.api_key = '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'

  event_body_str = event["body"]

  event_body = json.loads(event_body_str)

  problem = event_body["problem"]
  groupify = event_body["groupify"]
  cognify = event_body["cognify"]
  technify = event_body["technify"]
  temperature = event_body["temperature"]

  prompt = problem

  result = openai.Completion.create(
  model = 'davinci',
  prompt = prompt,
  temperature = temperature,
  max_tokens = 250,
  top_p = 1,
  frequency_penalty = 0,
  presence_penalty = 0,
  # stop = ["\n"],
  )
  
  response = result["choices"][0]["text"]

  return {
      "statusCode": 200,
      "headers": {
          "Access-Control-Allow-Headers": "*",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
      },
      "body": json.dumps(response)
  }