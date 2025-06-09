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
}