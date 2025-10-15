# Diagrama de Fluxo - Planejamento de Estoque

Este arquivo contém o diagrama Mermaid com o fluxo de planejamento de estoque. Se você usa uma extensão que renderiza Mermaid dentro de arquivos Markdown (por exemplo, "Markdown Preview Enhanced" ou extensões recentes do VS Code com suporte a Mermaid), a visualização deve aparecer automaticamente.

```mermaid
flowchart LR
  %% ========= LAYERS / SWIMLANES =========
  subgraph U["Unidades (32 estoques)"]
    A1[[Entrada Manual de Dados]]
    A2{{Erros? (campo obrigatório, data futura, SKU inválido)}}
  end

  subgraph ETL["Sistema / ETL & Qualidade"]
    B1[[Ingestão Automática (BD 50%)]]
    B2[[Validação & Normalização]]
    B3[[Regra de Qualidade & Dedupl.]]
    B4[(Movimentos + Snapshot de Estoque)]
    B5[[Cálculos: CMM, Cobertura, PP]]
    B6{{Alerta Cobertura < 30/15 dias}}
  end

  subgraph PLAN["Planejamento (Analista + IA)"]
    C1[[IA: Sugestão de Necessidades/Blocos]]
    C2[[Analista Revisar & Ajustar]]
    C3[[Gerar Ticket de Planejamento]]
    C4[[Gerar RC (Requisição de Compra)]]
  end

  subgraph SOP["Torre de Controle (S&OP)"]
    D1{{Aprovação do Bloco}}
    D2[[Decisão: Aprovado 100%]]
    D3[[Decisão: Parcial]]
    D4[[Decisão: Reprovado]]
  end

  subgraph PUR["Aquisição / Compras"]
    E1{{Existe Contrato?}}
    E2[[Pedido de Compra / Ordem de Fornecimento]]
    E3[[Abrir Subticket: Licitação]]
  end

  subgraph FORN["Fornecedor"]
    F1[[Preparar Entrega]]
    F2[[Enviar (com ETA)]]
  end

  subgraph LOG["Logística / Estoque & Fechamento"]
    G1[[Recebimento & Conferência]]
    G2[[Baixa em Estoque / Atualizar Snapshot]]
    G3[[Encerrar Ticket & Atualizar KPIs]]
  end

  %% ========= FLOWS =========
  A1 --> A2
  A2 -- "Sim" --> A1
  A2 -- "Não" --> B2

  B1 --> B2
  B2 --> B3 --> B4 --> B5 --> B6
  B6 -- "Itens elegíveis (PP atingido / baixa cobertura)" --> C1
  B6 -- "Sem alerta" --> C1

  C1 --> C2 --> C3 --> C4 --> D1

  D1 -->|Aprovado 100%| D2 --> E1
  D1 -->|Parcial| D3 --> C2
  D1 -->|Reprovado| D4 --> C2

  E1 -- "Sim" --> E2 --> F1 --> F2 --> G1 --> G2 --> G3
  E1 -- "Não" --> E3 --> E2 --> F1 --> F2 --> G1 --> G2 --> G3

  %% ========= ALERTAS & SLAs =========
  classDef alert fill:#ffe6e6,stroke:#ff5c5c,stroke-width:1px,color:#333;
  classDef ok fill:#e6ffe6,stroke:#5cb85c,stroke-width:1px,color:#333;
  classDef lane fill:#f7f7f7,stroke:#ddd;

  class B6 alert
  class D1 alert
  class G3 ok
```

Observações

- Caso sua extensão não renderize classes `classDef` ou `class`, remova essas linhas temporariamente para test.
- Se quiser posso gerar uma imagem (SVG/PNG) exportada a partir do Mermaid e adicionar aqui.
