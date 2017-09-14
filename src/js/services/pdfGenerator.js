import jsPDF from 'jspdf';

export function generatePDF() {
  /*const doc = new jsPDF();

  doc.text(20, 20, 'This is the default font.');

  doc.setFont('courier');
  doc.setFontType('normal');
  doc.text(20, 30, 'This is courier normal.');

  doc.setFont('times');
  doc.setFontType('italic');
  doc.text(20, 40, 'This is times italic.');

  doc.setFont('helvetica');
  doc.setFontType('bold');
  doc.text(20, 50, 'This is helvetica bold.');

  doc.setFont('courier');
  doc.setFontType('bolditalic');
  doc.text(20, 60, 'This is courier bolditalic.');

  const blob = doc.output('blob');*/
  window.open('/data/pdfTest.pdf');
}
