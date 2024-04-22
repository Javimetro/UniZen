*** Settings ***
Library    RequestsLibrary
Library    Collections
Library    SeleniumLibrary
Resource   login.resource

*** Keywords ***
Pause Execution
    Wait Until Keyword Succeeds    1h    5s    Log    Pausing test execution. Press Ctrl+C to continue.

*** Test Cases ***
Post Credentials to Kubios
    Create Session    my_session    ${LOGIN_URL}
    ${data}=    Create Login Data
    ${headers}=    Create Headers
    ${status}    ${response}=    Run Keyword And Ignore Error    POST On Session    my_session    /api/auth/login    json=${data}    headers=${headers}
    Run Keyword If    '${status}' == 'FAIL'    Fail    ${response}
    Should Contain    ${response.json()["message"]}    Logged in successfully with Kubios
    Open Browser    http://127.0.0.1:5501/client/index.html    browser=Chrome
    Input Text    id=username    vili.hakamies@metropolia.fi
    Input Text    id=password    Metrokubios123!
    Click Button    xpath=//input[@value='Login']
    Open Browser    http://127.0.0.1:5501/client/diary.html   browser=Chrome
    Sleep    3s
    Click Element    xpath://a[@href='account.html']
    Sleep    3s
    Click Link    id=logoutBtn

