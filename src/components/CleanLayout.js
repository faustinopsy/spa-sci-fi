export class CleanLayout {
    static wrap(contentElement) {
        const wrapper = document.createElement('div');
        wrapper.style.cssText = `
            background: #fff;
            color: #333;
            border-radius: 20px;
            padding: 40px;
            box-shadow: 0 20px 50px rgba(0,0,0,0.1);
            max-width: 1200px;
            width: 100%;
            height: 60vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            transition: transform 0.3s ease;
            position: relative;
        `;
        wrapper.className = 'scifi-card-wrapper'; 
        const contentContainer = document.createElement('div');
        contentContainer.style.width = '100%';
        if (typeof contentElement === 'string') {
            contentContainer.innerHTML = contentElement;
        } else {
            contentContainer.appendChild(contentElement);
        }

        wrapper.appendChild(contentContainer);
        return wrapper;
    }
}