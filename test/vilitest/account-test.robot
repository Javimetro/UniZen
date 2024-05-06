*** Settings ***
Library    RequestsLibrary
Library    Collections
Library    Browser
Resource   login.resource

*** Variables ***
${LOGIN_URL}     http://localhost:3000

*** Keywords ***
Pause Execution
    Wait Until Keyword Succeeds    1h    5s    Log    Pausing test execution. Press Ctrl+C to continue.

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

    # Store the login credentials in a variable
    Set Suite Variable    ${login_credentials}    ${data}

Continue With Logged In User
    # Use the login credentials from the previous test case
    ${data}=    Get Variable Value    ${login_credentials}
    New Browser    chromium    headless=False
    New Page    http://localhost:5173/client/index.html
    Type Text    id=username    ${data}[username]
    Type Text    id=password    ${data}[password]
    Click    xpath=//input[@value='Login']
    New Page    http://localhost:5173/client/diary.html
    Wait For Elements State    xpath://a[@href='account.html']    visible
    Click    xpath://a[@href='account.html']
    Wait For Elements State    id=logoutBtn    visible
    Click    id=logoutBtn
