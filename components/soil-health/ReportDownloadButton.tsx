'use client';

import { Download } from 'lucide-react';
import { RefObject } from 'react';

interface ReportDownloadButtonProps {
  reportRef: RefObject<HTMLDivElement>;
}

export function ReportDownloadButton({ reportRef }: ReportDownloadButtonProps) {
    const handleDownload = async () => {
        const input = reportRef.current;
        if (!input) {
            console.error("Report element not found for PDF generation.");
            return;
        }

        // Dynamically import libraries to ensure they are client-side only and compatible with Next.js SSR
        try {
            const { default: jsPDF } = await import('jspdf');
            const { default: html2canvas } = await import('html2canvas');
            
            const canvas = await html2canvas(input, { 
                backgroundColor: '#121212',
                scale: 2,
                useCORS: true,
            });
            
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4'
            });

            const pdfWidth = pdf.internal.pageSize.getWidth();
            const imgProps = pdf.getImageProperties(imgData);
            const imgWidth = pdfWidth - 20; // with 10mm margin on each side
            const imgHeight = (imgProps.height * imgWidth) / imgProps.width;
            
            // This logic will fit the content onto the page, scaling it down if necessary.
            pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
            pdf.save(`AgriWise_Soil_Report_${new Date().toISOString().slice(0,10)}.pdf`);

        } catch (error) {
            console.error("Could not generate PDF. This may be due to browser limitations or content issues.", error);
        }
    };

    return (
        <button 
          onClick={handleDownload} 
          className="liquid-glass-dark px-4 py-2 flex items-center space-x-2 hover:text-green-400 hover:border-green-400/70 transition-all duration-300"
        >
            <Download size={18} />
            <span>Download Report</span>
        </button>
    );
}