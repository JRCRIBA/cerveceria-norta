Set WshShell = CreateObject("WScript.Shell")
Set fso = CreateObject("Scripting.FileSystemObject")
currentDir = fso.GetParentFolderName(WScript.ScriptFullName)
WshShell.CurrentDirectory = currentDir

pyPath = "C:\Users\Julio Cristancho\AppData\Local\Python\pythoncore-3.14-64\pythonw.exe"
If Not fso.FileExists(pyPath) Then
    pyPath = "pythonw"
End If

cmd = """" & pyPath & """ """ & currentDir & "\servidor.py"""
WshShell.Run cmd, 0, False
