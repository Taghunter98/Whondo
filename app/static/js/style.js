export class Style {
    
    styleButton(valueID, colour, background, hoverBackground, activeBackground) {
        return /* css */`
        .${valueID} {
            background: var(${background});
            color: var(${colour});
            font-size: 16px;
            font-weight: 400;
            padding: 9px 16px;
            border-radius: 8px;
            border: none;
            cursor: pointer;
            transition: background 0.1s ease-in-out;
        }
        .${valueID}:hover {
            background: var(${hoverBackground});
        }
        .${valueID}:active {
            background: var(${activeBackground});
        }
        `
    }

    styleCard(valueID) {
        return /* css */ `
        h2, p {
            margin: 0;
            padding: 0;
        }
        .${valueID} {
            display: flex;
            flex-direction: column;
            padding: 20px;
            max-width: 500px;
            border-radius: 12px;
            border: solid 1px var(--black40);
            gap: 20px;
        }
        .${valueID}:hover {
            background: var(--black20);
            transition: background 0.4s;
        }
        `
    }
}