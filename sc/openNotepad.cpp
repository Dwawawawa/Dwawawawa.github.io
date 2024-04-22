#include <iostream>
#include <Windows.h>
#include <shellapi.h>
int wmain() {
    wchar_t buffer[MAX_PATH];
    // Get the path to the executable:
    GetModuleFileNameW(NULL, buffer, MAX_PATH);

    // Construct the path to a.txt by replacing the exe name in the path:
    std::wstring path(buffer);
    path = path.substr(0, path.find_last_of(L"\\") + 1) + L"a.txt";

    // Open a.txt using Notepad:
    ShellExecuteW(NULL, L"open", L"notepad.exe", path.c_str(), NULL, SW_SHOWNORMAL);

    return 0;
}
