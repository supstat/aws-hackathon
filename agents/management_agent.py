import os
import sys
from bedrock_agentcore.runtime import (
    BedrockAgentCoreApp,
)  #### AGENTCORE RUNTIME - LINE 1 ####
from strands import Agent
from strands.tools.mcp import MCPClient
from mcp.client.streamable_http import streamablehttp_client
import requests
import boto3
from strands.models import BedrockModel
# Add parent directory to path to import config
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from config import get_bedrock_model_for_agent


SYSTEM_PROMPT = """You are a management assistant for an t-shirt e-commerce company.
Your role is to optimize order sequency when a new order arrives and answer with the updated order sequency in json format. For this you need to do the following steps:

"""

# Initialize boto3 client
sts_client = boto3.client('sts')

# Get AWS account details
REGION = boto3.session.Session().region_name

# Initialize the AgentCore Runtime App
app = BedrockAgentCoreApp()  #### AGENTCORE RUNTIME - LINE 2 ####


# Global MCP client instance
_mcp_client = None



@app.entrypoint  #### AGENTCORE RUNTIME - LINE 3 ####
async def invoke(payload, context=None):
    """AgentCore Runtime entrypoint function"""
    user_input = payload.get("prompt", "")

    # Access request headers - handle None case
    request_headers = context.request_headers or {}

    # Get Client JWT token
    auth_header = request_headers.get('Authorization', '')

    print(f"Authorization header: {auth_header}")
    
    '''from mcp.client.stdio import stdio_client, StdioServerParameters 
    mes_client = MCPClient(lambda: stdio_client(
        StdioServerParameters(
            command="uv",
            args=["run", "python", "mcp_servers/servers/mes_mcp_server.py", "--stdio"]
        )
    ))
    erp_client = MCPClient(lambda: stdio_client(
        StdioServerParameters(
            command="uv",
            args=["run", "python", "mcp_servers/servers/erp_mcp_server.py", "--stdio"]
        )
    ))
    logistic_client = MCPClient(lambda: stdio_client(
        StdioServerParameters(
            command="uv",
            args=["run", "python", "mcp_servers/servers/logistic_mcp_server.py", "--stdio"]
        )
    ))
    all_mcp_tools = mes_client.list_tools_sync() + erp_client.list_tools_sync() + logistic_client.list_tools_sync()'''


    agent = Agent(
        model='us.anthropic.claude-sonnet-4-20250514-v1:0',
        system_prompt=SYSTEM_PROMPT,
        # tools=[all_mcp_tools]
    )
    # Invoke the agent
    response = agent(user_input)
    return response.message["content"][0]["text"]


if __name__ == "__main__":
    app.run(port=8081)  #### AGENTCORE RUNTIME - LINE 4 ####
