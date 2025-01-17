export const handleDownloadPdf = async (printRef: React.RefObject<HTMLDivElement | null>) => {
    const { default: html2pdf } = await import('html2pdf.js');

    const element = printRef.current;
    if (element) {
        const clonedElement = element.cloneNode(true) as HTMLElement;

        // const parentDiv = clonedElement.querySelector('div');

        // if (parentDiv) parentDiv.style.backgroundColor = '#f5faff';

        const img = clonedElement.querySelector('img');
        if (img) img.style.width = '80px';

        const paragraphs = clonedElement.querySelectorAll('p');
        const labels = clonedElement.querySelectorAll('label');
        const trs = clonedElement.querySelectorAll('tr');

        paragraphs.forEach((paragraph) => {
            paragraph.style.fontSize = '0.8rem';
            paragraph.style.lineHeight = '1.5rem'; // Set line height
        });

        labels.forEach((label) => {
            label.style.fontSize = '0.8rem';
        });

        trs.forEach((tr) => {
            tr.style.fontSize = '0.8rem';
            tr.style.backgroundColor = '#f5faff';
        });

        html2pdf(clonedElement, { margin: 15, backgroundColor: '#f5faff', filename: 'Invoice' });
    }
};