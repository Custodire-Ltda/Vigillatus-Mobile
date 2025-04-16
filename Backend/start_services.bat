echo O script executara comandos necessarios para executar os servicos do backend sequencialmente. TODO: substituir por uma solucao mais inteligente no futuro.
echo O script nao vai instalar dependencias do projeto em Python ou Javascript. TODO: implementar arquivo para instalar dependencias declarativamente.

@echo off

echo Executing Python service...
start cmd /k "cd Charts Service && python -m flask --app ChartsGestor run"

echo Running Node API...
start cmd /k  "npm start"

echo Services started.
pause