# DUT JOB - An application connecting DUT's students and enterprises.
## Description
DUT JOB is a website application for connecting DUT's students and enterprises. There are 4 actors in this system: guest, student, enterprise, admin.
The system used ASP.NET Core 2.1 framework for building API, Angular 7 and Bootstrap framework for developing the website for users. 
## Technologies and Tools
- ASP.NET Core 2.1
- Angular 7
- Visual Studio 2017
- Visual Code Studio 2017
- SQL Server 2017
- Git
## Building project
### Server
[.NET Core](https://docs.microsoft.com/dotnet/articles/welcome) provides a fast and modular platform for creating server apps that run on Windows, Linux, and macOS. Use Visual Studio Code with the C# extension to get a powerful editing experience with [C# IntelliSense](https://docs.microsoft.com/visualstudio/ide/visual-csharp-intellisense) (smart code completion) and debugging.

#### Prerequisites
Install the following:
- [.NET Core](https://dotnet.microsoft.com/download).
- The [C# extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode.csharp) from the VS Code Marketplace.
#### Guide
+ Open the server project with VS 2017
+ Change config for connect database in appsettings.json file
 ```console
 Server=ServerName; Database=DatabseName; Trusted_Connection=True; MultipleActiveResultSets=true
 ```
+ Import database: dut_job.sql (use SQL Server)
+ Run project: Ctrl + F5
### Client
#### Prerequisites
Both the CLI and generated project have dependencies that require Node 8.9 or higher, together with NPM 5.5.1 or higher.
Install the following:
- [Install npm](https://www.npmjs.com/get-npm)
- [Installing Angular CLI](https://angular.io/cli).
#### Guide
- Open the client project with Visual Code 2017
- Use teminal:
``` console
- npm install
- npm start
```
## Account
- Student role: student@gmail.com/123456
- Enterprise: company@gmail.com/123456
- Admin: admin@gmail.com/123456
