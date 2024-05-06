*** Settings ***
Library    RequestsLibrary
Library    Collections
Library    Browser
Resource   login.resource

*** Test Cases ***
Post Credentials to Kubios
    Create Session    my_session    ${LOGIN_URL}
    ${data}=    Create Login Data
    Log    ${data}
    ${headers}=    Create Headers
    Log    ${headers}
    ${status}    ${response}=    Run Keyword And Ignore Error    POST On Session    my_session    /api/auth/login    json=${data}    headers=${headers}
    Run Keyword If    '${status}' == 'FAIL'    Fail    ${response}
    Should Contain    ${response.json()["message"]}    Logged in successfully with Kubios
    New Browser    chromium    headless=False
    New Context
    New Page    ${LOGIN_URL}
    Type Text    id=username    ${data["username"]}
    Type Text    id=password    ${data["password"]}
    Click    text=Login
