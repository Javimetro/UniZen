*** Settings ***
Library    RequestsLibrary
Library    Collections
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
