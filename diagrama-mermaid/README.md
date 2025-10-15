# Diagrama Mermaid - Planejamento de Estoque

Este diretório contém uma página HTML que renderiza o diagrama de fluxo fornecido usando Mermaid.js.

Como abrir

- Abrir `diagrama-mermaid/index.html` no navegador (duplo clique). O Mermaid é carregado via CDN.
- Se preferir servir via servidor local (recomendado para evitar políticas de CORS do navegador), use um servidor estático simples. Exemplo com Python:

```powershell
# No Windows (PowerShell)
python -m http.server 8000
# Abrir http://localhost:8000/diagrama-mermaid/index.html
```

Observações

- O arquivo usa Mermaid v10 via CDN. Se quiser uma versão específica, altere a URL no `index.html`.
- Se houver problemas na renderização, abra o console do navegador para ver mensagens do Mermaid. Pode ser necessário atualizar o CDN caso a versão mude.
