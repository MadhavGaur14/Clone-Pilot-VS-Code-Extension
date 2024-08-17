// const vscode = require('vscode');
// const { exec } = require('child_process');
// const path = require('path');
// const pythonScriptPath = 'e:\\Coding\\projects\\planto.ai\\planto\\bard.py';

// function activate(context) {
//   let disposable = vscode.commands.registerCommand('codeSolver.solveProblem', async function () {
//     const editor = vscode.window.activeTextEditor;
//     if (editor) {
//       const document = editor.document;
//       const selection = editor.selection;
//       const selectedText = document.getText(selection);

//       const pythonScriptPath = path.join(__dirname, 'bard.py');
//       exec(`python ${pythonScriptPath} "${selectedText}"`, (error, stdout, stderr) => {
//         if (error) {
//           vscode.window.showErrorMessage(`Error: ${stderr}`);
//           return;
//         }

//         editor.edit(editBuilder => {
//           editBuilder.insert(selection.end, `\n${stdout}`);
//         });
//       });
//     }
//   });

//   context.subscriptions.push(disposable);
// }

// function deactivate() {}

// module.exports = {
//   activate,
//   deactivate
// };

const vscode = require('vscode');
const { exec } = require('child_process');
const path = require('path');
const pythonScriptPath = 'e:\\Coding\\projects\\planto.ai\\planto\\bard.py';

function activate(context) {
    // Register the command that will trigger the Python script
    let disposable = vscode.commands.registerCommand('codeSolver.solveProblem', async function () {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const document = editor.document;
            const selection = editor.selection;
            const selectedText = document.getText(selection);

            // Execute the Python script with the selected text as an argument
            exec(`python ${pythonScriptPath} "${selectedText}"`, (error, stdout, stderr) => {
                if (error) {
                    vscode.window.showErrorMessage(`Error: ${stderr}`);
                    return;
                }

                // Insert the generated response into the editor at the cursor position
                editor.edit(editBuilder => {
                    editBuilder.insert(selection.end, `\nGenerated response: ${stdout}`);
                });
            });
        }
    });

    context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};
