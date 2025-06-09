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

    styleContainer(direction, maxWidth, padding) {
        return  `
        display: flex;
        flex-direction: ${direction};
        padding: ${padding}px;
        max-width: ${maxWidth}px;
        `
    }

    styleImage() {
        return /* css */ `
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        `
    }

    styleCard(containerID, direction, maxWidth, padding) {
        
        return /* css */ `
        h2, p {
            margin: 0;
            padding: 0;
        }
        
        ${this.styleImage()}
        
        .${containerID} {
            ${this.styleContainer(direction, maxWidth, padding)}
            border-radius: 12px;
            border: solid 1px var(--black40);
            gap: 15px;
        }
        .${containerID}:hover {
            background: var(--black10);
            transition: background 0.4s;
        }
        `
    }
}