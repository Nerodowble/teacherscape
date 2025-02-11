import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import Navbar from "@/components/layout/Navbar";

const reportCategories = [
  {
    name: "Relatórios de Desempenho Acadêmico",
    reports: [
      "Desempenho Individual do Aluno",
      "Desempenho da Turma",
      "Desempenho por Disciplina",
    ],
  },
  {
    name: "Relatórios de Engajamento e Participação",
    reports: ["Frequência", "Participação em Atividades", "Uso de Recursos"],
  },
  {
    name: "Relatórios Administrativos",
    reports: ["Acesso à Plataforma", "Desempenho dos Professores"],
  },
];

const ReportItem = ({ reportName }: { reportName: string }) => {
  const handleClick = () => {
    alert(`Relatório selecionado: ${reportName}`); // Substitua por sua lógica
  };

  return (
    <div
      className="p-2 border rounded-md hover:bg-gray-100 hover:translate-x-2 transition-transform cursor-pointer"
      onClick={handleClick}
    >
      {reportName}
    </div>
  );
};

const ReportCategory = ({ category }: { category: { name: string; reports: string[] } }) => {
  return (
    <Card className="">
      <CardHeader>
        <CardTitle className="text-xl">{category.name}</CardTitle>
        <CardDescription>Relatórios de {category.name}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-2">
          {category.reports.map((reportName) => (
            <ReportItem key={reportName} reportName={reportName} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const Reports = () => {
  return (
    <div className="flex h-screen bg-neutral-light">
      <div className="flex-1 overflow-x-hidden">
        <Navbar />
        <div className="min-h-screen bg-neutral-light pt-16">
          <main className="container py-8">
            <div className="mb-8 animate-fade-in">
              <h1 className="text-4xl font-bold text-gradient mb-2">Reports</h1>
              <p className="text-neutral">Access and manage all your educational resources in one place.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reportCategories.map((category) => (
                <ReportCategory key={category.name} category={category} />
              ))}
            </div>

            <Card className="w-full mt-10">
              <CardHeader>
                <CardTitle>Opções de Personalização</CardTitle>
                <CardDescription>
                  Selecione as opções para personalizar os relatórios.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div>
                    <label htmlFor="period">Período</label>
                    <select id="period" className="w-full border rounded-md p-2">
                      <option>Semanal</option>
                      <option>Mensal</option>
                      <option>Anual</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="turma">Turma</label>
                    <select id="turma" className="w-full border rounded-md p-2">
                      <option>Todas</option>
                      <option>Turma A</option>
                      <option>Turma B</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="disciplina">Disciplina</label>
                    <select id="disciplina" className="w-full border rounded-md p-2">
                      <option>Todas</option>
                      <option>Matemática</option>
                      <option>Português</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="aluno">Aluno</label>
                    <select id="aluno" className="w-full border rounded-md p-2">
                      <option>Todos</option>
                      <option>Aluno 1</option>
                      <option>Aluno 2</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Exportar PDF
                  </button>
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Exportar DOCX
                  </button>
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Exportar XLSX
                  </button>
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Exportar CSV
                  </button>
                </div>
              </CardContent>
            </Card>

            <Card className="w-full mt-10">
              <CardHeader>
                <CardTitle>Agendamento de Relatórios</CardTitle>
                <CardDescription>
                  Agende a geração e envio de relatórios.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div>
                    <label htmlFor="intervalo">Intervalo</label>
                    <select id="intervalo" className="w-full border rounded-md p-2">
                      <option>Semanal</option>
                      <option>Mensal</option>
                      <option>Trimestral</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="destinatarios">Destinatários</label>
                    <input
                      type="text"
                      id="destinatarios"
                      className="w-full border rounded-md p-2"
                      placeholder="professores, administradores, pais"
                    />
                  </div>
                  <div>
                    <label htmlFor="formato">Formato</label>
                    <select id="formato" className="w-full border rounded-md p-2">
                      <option>PDF</option>
                      <option>DOCX</option>
                      <option>XLSX</option>
                      <option>CSV</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end mt-4">
                  <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                    Agendar
                  </button>
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Reports;
