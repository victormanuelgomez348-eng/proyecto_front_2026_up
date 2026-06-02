import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.scss']
})
export class ReportesComponent {
  filtro = {
    servicio: 'todos',
    inicio: '',
    fin: ''
  };

  formato: 'pdf' | 'excel' = 'pdf';

  generarReporte() {
    if (!this.validarFiltro()) {
      return;
    }

    const nombreArchivo = this.crearNombreArchivo();
    const contenido = this.crearContenidoReporte();

    if (this.formato === 'excel') {
      const csvBlob = this.crearCsvBlob(contenido);
      this.descargarBlob(csvBlob, nombreArchivo);
    } else {
      const pdfBlob = this.crearPdfBlob(contenido);
      this.descargarBlob(pdfBlob, nombreArchivo);
    }
  }

  private validarFiltro(): boolean {
    if (!this.filtro.inicio || !this.filtro.fin) {
      alert('Por favor selecciona una fecha de inicio y una fecha de fin.');
      return false;
    }

    if (this.filtro.inicio > this.filtro.fin) {
      alert('La fecha de inicio no puede ser mayor a la fecha de fin.');
      return false;
    }

    return true;
  }

  private crearNombreArchivo(): string {
    const inicio = this.filtro.inicio.replace(/-/g, '');
    const fin = this.filtro.fin.replace(/-/g, '');
    const servicio = this.filtro.servicio === 'todos' ? 'general' : this.filtro.servicio;
    const extension = this.formato === 'excel' ? 'csv' : 'pdf';

    return `reporte_${servicio}_${inicio}_${fin}.${extension}`;
  }

  private crearContenidoReporte(): string[][] {
    const nombreServicio = this.filtro.servicio === 'todos' ? 'Todos los servicios' : this.filtro.servicio;
    const fechaGeneracion = new Date().toLocaleDateString('es-CO');

    const resumen = [
      ['Servicio', nombreServicio],
      ['Fecha inicio', this.filtro.inicio],
      ['Fecha fin', this.filtro.fin],
      ['Generado por', 'Admin'],
      ['Fecha de generación', fechaGeneracion]
    ];

    const datos = [
      ['Métrica', 'Valor'],
      ['Beneficiarios atendidos', '680'],
      ['Intervenciones realizadas', '320'],
      ['Jornadas ejecutadas', '18'],
      ['Asesorías completadas', '42'],
      ['Indicador de satisfacción', '92 %'],
      ['Ingresos estimados', '$1.240.000']
    ];

    return [['REPORTE ORGANIZADO', '']] // Encabezado del reporte
      .concat([['', '']])
      .concat(resumen)
      .concat([['', '']])
      .concat(datos);
  }

  private crearCsvBlob(contenido: string[][]): Blob {
    const csv = contenido
      .map(fila => fila.map(celda => this.escapeCsv(celda)).join(','))
      .join('\r\n');

    return new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  }

  private escapeCsv(valor: string): string {
    const necesidadComillas = /[",\n\r]/.test(valor);
    const valorEscapado = valor.replace(/"/g, '""');

    return necesidadComillas ? `"${valorEscapado}"` : valorEscapado;
  }

  private crearPdfBlob(contenido: string[][]): Blob {
    const lineas = contenido.map(fila => {
      const titulo = fila[0] ? fila[0].padEnd(40, ' ') : ''.padEnd(40, ' ');
      return `${titulo} ${fila[1]}`.trim();
    });

    const contentStream = `BT /F1 12 Tf\n${lineas
      .map((linea, index) => `40 ${820 - index * 18} Td (${this.escapePdfText(linea)}) Tj\n`)
      .join('')}ET`;

    const objects: string[] = [];
    let byteOffset = 0;
    const positions: number[] = [];

    const appendObject = (value: string) => {
      positions.push(byteOffset);
      const bytes = new TextEncoder().encode(value);
      byteOffset += bytes.length;
      objects.push(value);
    };

    appendObject('%PDF-1.4\n');
    appendObject('1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n');
    appendObject('2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n');

    const streamBytes = new TextEncoder().encode(contentStream);
    appendObject(
      `3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>\nendobj\n`
    );
    appendObject(`4 0 obj\n<< /Length ${streamBytes.length} >>\nstream\n${contentStream}\nendstream\nendobj\n`);
    appendObject('5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n');

    const xrefPosition = byteOffset;
    let xref = 'xref\n0 6\n0000000000 65535 f \n';
    positions.forEach(pos => {
      xref += `${pos.toString().padStart(10, '0')} 00000 n \n`;
    });

    const trailer = `trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${xrefPosition}\n%%EOF\n`;

    const pdfBytes = new Uint8Array(byteOffset + new TextEncoder().encode(xref + trailer).length);
    let offset = 0;
    objects.forEach(part => {
      const bytes = new TextEncoder().encode(part);
      pdfBytes.set(bytes, offset);
      offset += bytes.length;
    });
    const trailerBytes = new TextEncoder().encode(xref + trailer);
    pdfBytes.set(trailerBytes, offset);

    return new Blob([pdfBytes], { type: 'application/pdf' });
  }

  private escapePdfText(text: string): string {
    return text
      .replace(/\\/g, '\\\\')
      .replace(/\(/g, '\\(')
      .replace(/\)/g, '\\)')
      .replace(/\n/g, '\\n');
  }

  private descargarBlob(blob: Blob, nombreArchivo: string): void {
    const url = URL.createObjectURL(blob);
    const enlace = document.createElement('a');
    enlace.href = url;
    enlace.download = nombreArchivo;
    enlace.style.display = 'none';

    document.body.appendChild(enlace);
    enlace.click();
    document.body.removeChild(enlace);
    URL.revokeObjectURL(url);
  }
}
