graph TB
    subgraph "MVP Core (11 Tables)"
        subgraph "Users & Access"
            U[users]
            CP[content_packs]
            SUB[user_pack_subscriptions]
        end
        
        subgraph "Knowledge Structure"
            K[knowledge<br/>topics/categories/attributes/facts]
        end
        
        subgraph "Quiz Engine"
            QS[quiz_sessions]
            Q[questions]
            AO[answer_options]
            AOC[answer_option_components<br/>⭐ KEY INNOVATION]
        end
        
        subgraph "Simple Tracking"
            UKP[user_knowledge_progress<br/>basic mastery %]
            AE[analytics_events<br/>📊 logs everything]
        end
    end
    
    subgraph "V2 Intelligence (Add Later)"
        style V2 stroke-dasharray: 5 5
        ADV[❌ user_adaptive_state]
        CM[❌ confusion_matrix]
        QE[❌ question_effectiveness]
        PRE[❌ prerequisites]
        SR[❌ spaced_repetition]
    end
    
    %% Relationships
    U --> SUB
    CP --> SUB
    CP --> K
    U --> QS
    QS --> Q
    Q --> AO
    AO --> AOC
    AOC --> K
    U --> UKP
    K --> UKP
    
    %% Future data flow
    AE -.->|"After 30 days<br/>of data"| ADV
    AE -.-> CM
    AE -.-> QE
    
    %% Styling
    classDef core fill:#c8e6c9,stroke:#2e7d32,stroke-width:3px
    classDef tracking fill:#fff3e0,stroke:#ff6f00,stroke-width:2px
    classDef future fill:#f5f5f5,stroke:#9e9e9e,stroke-width:1px,stroke-dasharray: 5 5
    classDef innovation fill:#ffeb3b,stroke:#f57c00,stroke-width:4px
    
    class U,CP,SUB,K,QS,Q,AO core
    class UKP,AE tracking
    class ADV,CM,QE,PRE,SR future
    class AOC innovation