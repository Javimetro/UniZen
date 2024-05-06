*** Settings ***
Library    RequestsLibrary
Library    Collections
Resource   login_wrong.resource

*** Variables ***
${LOGIN_URL}     http://localhost:3000

*** Test Cases ***
Post Credentials to Kubios
    Create Session    my_session    ${LOGIN_URL}
    &{data}=    Create Dictionary    username=${username}    password=${password}
    Log    ${data}
    ${headers}=    Create Dictionary    Content-Type=application/json
    Log    ${headers}
    ${status}    ${response}=    Run Keyword And Ignore Error    POST On Session    my_session    /api/auth/login    json=${data}    headers=${headers}
    Run Keyword If    '${status}' == 'FAIL'    Fail    ${response}
    Should Contain    ${response.json()["message"]}    Logged in successfully with Kubios
