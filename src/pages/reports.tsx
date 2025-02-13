import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import Navbar from "@/components/layout/Navbar";
import { useTranslation } from 'react-i18next';

const ReportItem = ({ reportName }: { reportName: string }) => {
  const { t } = useTranslation();
  const handleClick = () => {
    alert(t('Relatório selecionado:') + ` ${reportName}`);
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

const ReportCategory = ({ category, t }: { category: { name: string; reports: string[] }; t: any }) => {
  return (
    <Card className="">
      <CardHeader>
        <CardTitle className="text-xl">{category.name}</CardTitle>
        <CardDescription>{t('Relatórios de')} {category.name}</CardDescription>
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
  const { t } = useTranslation();

  const reportCategories = [
    {
      name: t("Relatórios de Desempenho Acadêmico"),
      reports: [
        t("Desempenho Individual do Aluno"),
        t("Desempenho da Turma"),
        t("Desempenho por Disciplina"),
      ],
    },
    {
      name: t("Relatórios de Engajamento e Participação"),
      reports: [t("Frequência"), t("Participação em Atividades"), t("Uso de Recursos")],
    },
    {
      name: t("Relatórios Administrativos"),
      reports: [t("Acesso à Plataforma"), t("Desempenho dos Professores")],
    },
  ];

  return (
    <div className="flex h-screen bg-neutral-light">
      <div className="flex-1 overflow-x-hidden">
        <Navbar />
        <div className="min-h-screen bg-neutral-light pt-16">
          <main className="container py-8">
            <div className="mb-8 animate-fade-in">
              <h1 className="text-4xl font-bold text-gradient mb-2">{t('Reports')}</h1>
              <p className="text-neutral">{t('Access and manage all your educational resources in one place.')}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reportCategories.map((category) => (
                <ReportCategory key={category.name} category={category} t={t} />
              ))}
            </div>

            <Card className="w-full mt-10">
              <CardHeader>
                <CardTitle>{t('Opções de Personalização')}</CardTitle>
                <CardDescription>
                  {t('Selecione as opções para personalizar os relatórios.')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div>
                    <label htmlFor="period">{t('Período')}</label>
                    <select id="period" className="w-full border rounded-md p-2">
                      <option>{t('Semanal')}</option>
                      <option>{t('Mensal')}</option>
                      <option>{t('Anual')}</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="turma">{t('Turma')}</label>
                    <select id="turma" className="w-full border rounded-md p-2">
                      <option>{t('Todas')}</option>
                      <option>Turma A</option>
                      <option>Turma B</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="disciplina">{t('Disciplina')}</label>
                    <select id="disciplina" className="w-full border rounded-md p-2">
                      <option>{t('Todas')}</option>
                      <option>Matemática</option>
                      <option>Português</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="aluno">{t('Aluno')}</label>
                    <select id="aluno" className="w-full border rounded-md p-2">
                      <option>{t('Todos')}</option>
                      <option>Aluno 1</option>
                      <option>Aluno 2</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    {t('Exportar PDF')}
                  </button>
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    {t('Exportar DOCX')}
                  </button>
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    {t('Exportar XLSX')}
                  </button>
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    {t('Exportar CSV')}
                  </button>
                </div>
              </CardContent>
            </Card>

            <Card className="w-full mt-10">
              <CardHeader>
                <CardTitle>{t('Agendamento de Relatórios')}</CardTitle>
                <CardDescription>
                  {t('Agende a geração e envio de relatórios.')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div>
                    <label htmlFor="intervalo">{t('Intervalo')}</label>
                    <select id="intervalo" className="w-full border rounded-md p-2">
                      <option>{t('Semanal')}</option>
                      <option>{t('Mensal')}</option>
                      <option>{t('Trimestral')}</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="destinatarios">{t('Destinatários')}</label>
                    <input
                      type="text"
                      id="destinatarios"
                      className="w-full border rounded-md p-2"
                      placeholder={t('professores, administradores, pais')}
                    />
                  </div>
                  <div>
                    <label htmlFor="formato">{t('Formato')}</label>
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
                    {t('Agendar')}
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
