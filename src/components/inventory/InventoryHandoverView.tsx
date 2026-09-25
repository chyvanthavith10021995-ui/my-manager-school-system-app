import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import type { SchoolAsset, MaterialHandover, FinancialTransaction, TransactionType } from '../../types';
import {
  PackageCheck,
  TrendingUp,
  TrendingDown,
  Boxes,
  ArrowUpRight,
  ArrowDownLeft,
  Plus,
  Search,
  DollarSign,
  Printer,
  Trash2,
  Edit2,
  ShieldCheck,
  Tag
} from 'lucide-react';

export const InventoryHandoverView: React.FC = () => {
  const {
    schoolAssets,
    addSchoolAsset,
    updateSchoolAsset,
    deleteSchoolAsset,
    materialHandovers,
    addMaterialHandover,
    updateMaterialHandover,
    deleteMaterialHandover,
    financialTransactions,
    addFinancialTransaction,
    updateFinancialTransaction,
    deleteFinancialTransaction
  } = useApp();

  const [activeTab, setActiveTab] = useState<'assets' | 'handovers' | 'finance' | 'report'>('assets');
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [conditionFilter, setConditionFilter] = useState<string>('all');

  // Modals state
  const [isAssetModalOpen, setIsAssetModalOpen] = useState(false);
  const [editingAssetId, setEditingAssetId] = useState<string | null>(null);

  const [isHandoverModalOpen, setIsHandoverModalOpen] = useState(false);
  const [editingHandoverId, setEditingHandoverId] = useState<string | null>(null);

  const [isTxModalOpen, setIsTxModalOpen] = useState(false);
  const [editingTxId, setEditingTxId] = useState<string | null>(null);

  // Asset Form
  const [assetName, setAssetName] = useState('');
  const [assetCategory, setAssetCategory] = useState<SchoolAsset['category']>('គ្រឿងសង្ហារិម');
  const [assetQuantity, setAssetQuantity] = useState(1);
  const [assetCondition, setAssetCondition] = useState<SchoolAsset['condition']>('ល្អ (Good)');
  const [locationRoom, setLocationRoom] = useState('បន្ទប់រៀន');
  const [acquisitionDate, setAcquisitionDate] = useState('2026-09-24');
  const [valueRiel, setValueRiel] = useState(100000);

  // Handover Form
  const [handoverType, setHandoverType] = useState<MaterialHandover['handoverType']>('ទទួល (Receive)');
  const [itemName, setItemName] = useState('');
  const [hoCategory, setHoCategory] = useState<MaterialHandover['category']>('សៀវភៅសិក្សា');
  const [hoQuantity, setHoQuantity] = useState(10);
  const [unit, setUnit] = useState('ក្បាល');
  const [fromParty, setFromParty] = useState('');
  const [toParty, setToParty] = useState('');
  const [hoDate, setHoDate] = useState('2026-09-24');
  const [receiverSignatureName, setReceiverSignatureName] = useState('');

  // Finance Form
  const [txType, setTxType] = useState<TransactionType>('ចំណូល (Income)');
  const [txTitle, setTxTitle] = useState('');
  const [txCategory, setTxCategory] = useState<FinancialTransaction['category']>('ថវិការដ្ឋ (PB)');
  const [amountRiel, setAmountRiel] = useState(400000);
  const [amountUSD, setAmountUSD] = useState(100);
  const [txDate, setTxDate] = useState('2026-09-24');
  const [handledBy, setHandledBy] = useState('លោកនាយក ឈិត សារ៉ាំ');
  const [remarks, setRemarks] = useState('');

  // Computations
  const totalIncomeRiel = financialTransactions
    .filter(t => t.transactionType.includes('ចំណូល'))
    .reduce((sum, t) => sum + t.amountRiel, 0);

  const totalExpenseRiel = financialTransactions
    .filter(t => t.transactionType.includes('ចំណាយ'))
    .reduce((sum, t) => sum + t.amountRiel, 0);

  const netBalanceRiel = totalIncomeRiel - totalExpenseRiel;

  const totalAssetsCount = schoolAssets.reduce((sum, a) => sum + a.quantity, 0);
  const totalAssetsValueRiel = schoolAssets.reduce((sum, a) => sum + (a.valueRiel || 0), 0);

  // Filtered Assets
  const filteredAssets = schoolAssets.filter(asset => {
    const matchesSearch =
      asset.name.toLowerCase().includes(search.toLowerCase()) ||
      asset.assetCode.toLowerCase().includes(search.toLowerCase()) ||
      asset.locationRoom.toLowerCase().includes(search.toLowerCase());

    const matchesCategory = categoryFilter === 'all' || asset.category === categoryFilter;
    const matchesCondition = conditionFilter === 'all' || asset.condition.includes(conditionFilter);

    return matchesSearch && matchesCategory && matchesCondition;
  });

  // Filtered Handovers
  const filteredHandovers = materialHandovers.filter(ho => {
    return (
      ho.itemName.toLowerCase().includes(search.toLowerCase()) ||
      ho.fromParty.toLowerCase().includes(search.toLowerCase()) ||
      ho.toParty.toLowerCase().includes(search.toLowerCase()) ||
      ho.receiverSignatureName.toLowerCase().includes(search.toLowerCase())
    );
  });

  // Filtered Finance
  const filteredFinance = financialTransactions.filter(tx => {
    return (
      tx.title.toLowerCase().includes(search.toLowerCase()) ||
      tx.voucherNo.toLowerCase().includes(search.toLowerCase()) ||
      tx.handledBy.toLowerCase().includes(search.toLowerCase()) ||
      tx.category.toLowerCase().includes(search.toLowerCase())
    );
  });

  // Open Edit Modals
  const openEditAssetModal = (asset: SchoolAsset) => {
    setEditingAssetId(asset.id);
    setAssetName(asset.name);
    setAssetCategory(asset.category);
    setAssetQuantity(asset.quantity);
    setAssetCondition(asset.condition);
    setLocationRoom(asset.locationRoom);
    setAcquisitionDate(asset.acquisitionDate);
    setValueRiel(asset.valueRiel || 100000);
    setIsAssetModalOpen(true);
  };

  const openEditHandoverModal = (ho: MaterialHandover) => {
    setEditingHandoverId(ho.id);
    setHandoverType(ho.handoverType);
    setItemName(ho.itemName);
    setHoCategory(ho.category);
    setHoQuantity(ho.quantity);
    setUnit(ho.unit);
    setFromParty(ho.fromParty);
    setToParty(ho.toParty);
    setHoDate(ho.date);
    setReceiverSignatureName(ho.receiverSignatureName);
    setIsHandoverModalOpen(true);
  };

  const openEditTxModal = (tx: FinancialTransaction) => {
    setEditingTxId(tx.id);
    setTxType(tx.transactionType);
    setTxTitle(tx.title);
    setTxCategory(tx.category);
    setAmountRiel(tx.amountRiel);
    setAmountUSD(tx.amountUSD);
    setTxDate(tx.date);
    setHandledBy(tx.handledBy);
    setRemarks(tx.remarks || '');
    setIsTxModalOpen(true);
  };

  // Handlers
  const handleSaveAsset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!assetName) return;

    if (editingAssetId) {
      updateSchoolAsset(editingAssetId, {
        name: assetName,
        category: assetCategory,
        quantity: assetQuantity,
        condition: assetCondition,
        locationRoom,
        acquisitionDate,
        valueRiel
      });
    } else {
      addSchoolAsset({
        name: assetName,
        category: assetCategory,
        quantity: assetQuantity,
        condition: assetCondition,
        locationRoom,
        acquisitionDate,
        valueRiel
      });
    }

    setIsAssetModalOpen(false);
    resetAssetForm();
  };

  const resetAssetForm = () => {
    setEditingAssetId(null);
    setAssetName('');
    setAssetQuantity(1);
    setValueRiel(100000);
  };

  const handleSaveHandover = (e: React.FormEvent) => {
    e.preventDefault();
    if (!itemName) return;

    if (editingHandoverId) {
      updateMaterialHandover(editingHandoverId, {
        handoverType,
        itemName,
        category: hoCategory,
        quantity: hoQuantity,
        unit,
        fromParty,
        toParty,
        date: hoDate,
        receiverSignatureName
      });
    } else {
      addMaterialHandover({
        handoverType,
        itemName,
        category: hoCategory,
        quantity: hoQuantity,
        unit,
        fromParty,
        toParty,
        date: hoDate,
        receiverSignatureName
      });
    }

    setIsHandoverModalOpen(false);
    resetHandoverForm();
  };

  const resetHandoverForm = () => {
    setEditingHandoverId(null);
    setItemName('');
    setFromParty('');
    setToParty('');
    setReceiverSignatureName('');
    setHoQuantity(10);
  };

  const handleSaveTx = (e: React.FormEvent) => {
    e.preventDefault();
    if (!txTitle) return;

    if (editingTxId) {
      updateFinancialTransaction(editingTxId, {
        transactionType: txType,
        title: txTitle,
        category: txCategory,
        amountRiel,
        amountUSD,
        date: txDate,
        handledBy,
        remarks
      });
    } else {
      addFinancialTransaction({
        transactionType: txType,
        title: txTitle,
        category: txCategory,
        amountRiel,
        amountUSD,
        date: txDate,
        handledBy,
        remarks
      });
    }

    setIsTxModalOpen(false);
    resetTxForm();
  };

  const resetTxForm = () => {
    setEditingTxId(null);
    setTxTitle('');
    setRemarks('');
    setAmountRiel(400000);
    setAmountUSD(100);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700/60 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-700/60 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 text-xs font-bold rounded-full bg-cyan-100 text-cyan-800 dark:bg-cyan-900/40 dark:text-cyan-300">
                ស្ដង់ដារទី៤ សូចនាករ ៤.២.២, ៤.២.៣ & ៦.១-៦.៥
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">MoEYS Standard Assets & Program Budget</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
              គ្រប់គ្រងសម្ភារៈសារពើភ័ណ្ឌ, ជំនួយសាលា & ថវិការដ្ឋ (PB)
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              សាលាបឋមសិក្សា អន្លង់តាម៉ី (ភូមិចំការស្វាយ & ភូមិអន្លង់តាម៉ី, ឃុំឈើទាល, ស្រុកបាណន់, ខេត្តបាត់ដំបង)
            </p>
          </div>

          <div className="flex items-center gap-2">
            {activeTab === 'assets' && (
              <button
                onClick={() => {
                  resetAssetForm();
                  setIsAssetModalOpen(true);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-xl transition font-medium text-sm shadow-md shadow-cyan-500/20"
              >
                <Plus size={18} />
                <span>បន្ថែមសម្ភារៈសារពើភ័ណ្ឌ</span>
              </button>
            )}

            {activeTab === 'handovers' && (
              <button
                onClick={() => {
                  resetHandoverForm();
                  setIsHandoverModalOpen(true);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition font-medium text-sm shadow-md shadow-blue-500/20"
              >
                <Plus size={18} />
                <span>បន្ថែមការប្រគល់-ទទួល</span>
              </button>
            )}

            {activeTab === 'finance' && (
              <button
                onClick={() => {
                  resetTxForm();
                  setIsTxModalOpen(true);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition font-medium text-sm shadow-md shadow-emerald-500/20"
              >
                <Plus size={18} />
                <span>បន្ថែម ចំណូល/ចំណាយ PB</span>
              </button>
            )}

            {activeTab === 'report' && (
              <button
                onClick={() => window.print()}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl transition font-medium text-sm shadow-md shadow-purple-500/20"
              >
                <Printer size={18} />
                <span>បោះពុម្ពផ្ទាំងតម្លាភាព</span>
              </button>
            )}
          </div>
        </div>

        {/* MoEYS Standard Badges Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
          <div className="p-3.5 rounded-xl bg-cyan-50/70 dark:bg-cyan-950/30 border border-cyan-200 dark:border-cyan-800/40 flex items-center gap-3">
            <Boxes className="w-8 h-8 text-cyan-600 dark:text-cyan-400 shrink-0" />
            <div>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold block">សារពើភ័ណ្ឌ (៤.២.៣)</span>
              <span className="text-sm font-extrabold text-cyan-900 dark:text-cyan-200">
                {totalAssetsCount} គ្រឿង • {(totalAssetsValueRiel / 1000000).toFixed(1)}M ៛
              </span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/40 flex items-center gap-3">
            <DollarSign className="w-8 h-8 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <div>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold block">ថវិការដ្ឋ PB (៤.២.២)</span>
              <span className="text-sm font-extrabold text-emerald-900 dark:text-emerald-200">
                {netBalanceRiel.toLocaleString()} ៛ (${Math.round(netBalanceRiel / 4000)})
              </span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/40 flex items-center gap-3">
            <PackageCheck className="w-8 h-8 text-blue-600 dark:text-blue-400 shrink-0" />
            <div>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold block">ប្រគល់-ទទួលសម្ភារៈ</span>
              <span className="text-sm font-extrabold text-blue-900 dark:text-blue-200">
                {materialHandovers.length} ប្រតិបត្តិការ (EGR/EGM/WFP)
              </span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-purple-50/70 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800/40 flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-purple-600 dark:text-purple-400 shrink-0" />
            <div>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold block">តម្លាភាពសហគមន៍</span>
              <span className="text-sm font-extrabold text-purple-900 dark:text-purple-200">
                បិទផ្សាយតម្លាភាព គគស ១០០%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs bar */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-700 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab('assets')}
          className={`px-5 py-3 font-semibold text-sm rounded-t-xl transition border-b-2 flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'assets'
              ? 'border-cyan-600 text-cyan-600 dark:text-cyan-400 bg-white dark:bg-slate-800'
              : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
          }`}
        >
          <Boxes size={18} />
          <span>១. បញ្ជីគ្រប់គ្រងសម្ភារៈសារពើភ័ណ្ឌ ({schoolAssets.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('handovers')}
          className={`px-5 py-3 font-semibold text-sm rounded-t-xl transition border-b-2 flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'handovers'
              ? 'border-blue-600 text-blue-600 dark:text-blue-400 bg-white dark:bg-slate-800'
              : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
          }`}
        >
          <PackageCheck size={18} />
          <span>២. បញ្ជីប្រគល់-ទទួលសម្ភារៈ ({materialHandovers.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('finance')}
          className={`px-5 py-3 font-semibold text-sm rounded-t-xl transition border-b-2 flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'finance'
              ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400 bg-white dark:bg-slate-800'
              : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
          }`}
        >
          <DollarSign size={18} />
          <span>៣. សៀវភៅកត់ត្រាចំណូល-ចំណាយ ថវិការដ្ឋ PB ({financialTransactions.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('report')}
          className={`px-5 py-3 font-semibold text-sm rounded-t-xl transition border-b-2 flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'report'
              ? 'border-purple-600 text-purple-600 dark:text-purple-400 bg-white dark:bg-slate-800'
              : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
          }`}
        >
          <Printer size={18} />
          <span>៤. របាយការណ៍ស្ដង់ដារ & ផ្ទាំងតម្លាភាព</span>
        </button>
      </div>

      {/* TAB 1: SCHOOL ASSET INVENTORY */}
      {activeTab === 'assets' && (
        <div className="space-y-6">
          {/* Controls & Search */}
          <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700/60 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="ស្វែងរកឈ្មោះសម្ភារៈ, កូដសូជី, ទីតាំង..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:text-white"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-600 dark:text-slate-400">ប្រភេទ៖</span>
                <select
                  value={categoryFilter}
                  onChange={e => setCategoryFilter(e.target.value)}
                  className="px-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:text-white"
                >
                  <option value="all">គ្រប់ប្រភេទទាំងអស់</option>
                  <option value="គ្រឿងសង្ហារិម">គ្រឿងសង្ហារិម</option>
                  <option value="ឧបករណ៍បច្ចេកវិទ្យា">ឧបករណ៍បច្ចេកវិទ្យា / ICT</option>
                  <option value="ឧបករណ៍បង្រៀន">ឧបករណ៍បង្រៀន / STEM</option>
                  <option value="សម្ភារអនាម័យ">សម្ភារអនាម័យ / WASH</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-600 dark:text-slate-400">គុណភាព៖</span>
                <select
                  value={conditionFilter}
                  onChange={e => setConditionFilter(e.target.value)}
                  className="px-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:text-white"
                >
                  <option value="all">គ្រប់ស្ថានភាព</option>
                  <option value="ល្អ">ល្អ (Good)</option>
                  <option value="មធ្យម">មធ្យម (Fair)</option>
                  <option value="ត្រូវការជួសជុល">ត្រូវការជួសជុល</option>
                </select>
              </div>
            </div>
          </div>

          {/* Standardized Asset Inventory Table */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700/60 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300">
                <thead className="bg-slate-50 dark:bg-slate-900/60 text-[11px] font-bold text-slate-500 uppercase border-b border-slate-200 dark:border-slate-700/60">
                  <tr>
                    <th className="px-4 py-3">លេខកូដសូជី (Asset Tag)</th>
                    <th className="px-4 py-3">ឈ្មោះសម្ភារៈ / ឧបករណ៍ស្ដង់ដារ MoEYS</th>
                    <th className="px-4 py-3">ប្រភេទសម្ភារៈ</th>
                    <th className="px-4 py-3 text-center">ចំនួន (គ្រឿង)</th>
                    <th className="px-4 py-3 text-center">ស្ថានភាពគុណភាព</th>
                    <th className="px-4 py-3">ទីតាំងរៀបចំ / បន្ទប់</th>
                    <th className="px-4 py-3">តម្លៃប៉ាន់ស្មាន (៛)</th>
                    <th className="px-4 py-3">ថ្ងៃទទួលបាន</th>
                    <th className="px-4 py-3 text-right">សកម្មភាព</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {filteredAssets.map(asset => (
                    <tr key={asset.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-700/30 transition">
                      <td className="px-4 py-3 font-mono text-xs font-extrabold text-cyan-600 dark:text-cyan-400 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <Tag size={13} />
                          <span>{asset.assetCode}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 font-bold text-slate-900 dark:text-white">
                        {asset.name}
                      </td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-0.5 text-[11px] font-semibold bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-md">
                          {asset.category}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-black text-slate-900 dark:text-white text-center">
                        {asset.quantity}
                      </td>
                      <td className="px-4 py-3 text-center whitespace-nowrap">
                        <span
                          className={`px-2.5 py-1 text-[11px] font-extrabold rounded-full border ${
                            asset.condition.includes('ល្អ')
                              ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300 border-emerald-300'
                              : asset.condition.includes('មធ្យម')
                              ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 border-blue-300'
                              : 'bg-rose-100 dark:bg-rose-900/40 text-rose-800 dark:text-rose-300 border-rose-300'
                          }`}
                        >
                          {asset.condition}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-medium text-slate-800 dark:text-slate-200">
                        {asset.locationRoom}
                      </td>
                      <td className="px-4 py-3 font-bold text-cyan-700 dark:text-cyan-300 whitespace-nowrap">
                        {asset.valueRiel ? asset.valueRiel.toLocaleString() + ' ៛' : 'N/A'}
                      </td>
                      <td className="px-4 py-3 text-slate-500 whitespace-nowrap">{asset.acquisitionDate}</td>
                      <td className="px-4 py-3 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => openEditAssetModal(asset)}
                            className="p-1.5 text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                            title="កែប្រែសម្ភារៈ"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => deleteSchoolAsset(asset.id)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 transition rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                            title="លុបសម្ភារៈ"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: MATERIAL HANDOVERS */}
      {activeTab === 'handovers' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700/60 shadow-sm flex items-center justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="ស្វែងរកសៀវភៅ, អ្នកប្រគល់ ឬអ្នកទទួល..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
              />
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700/60 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300">
                <thead className="bg-slate-50 dark:bg-slate-900/60 text-[11px] font-bold text-slate-500 uppercase border-b border-slate-200 dark:border-slate-700/60">
                  <tr>
                    <th className="px-4 py-3">ប្រភេទប្រតិបត្តិការ</th>
                    <th className="px-4 py-3">ឈ្មោះសម្ភារៈ / កញ្ចប់សៀវភៅគោល</th>
                    <th className="px-4 py-3">ជំពូកសម្ភារៈ</th>
                    <th className="px-4 py-3 text-center">បរិមាណ</th>
                    <th className="px-4 py-3">ប្រគល់ពី</th>
                    <th className="px-4 py-3">ជូនទៅ</th>
                    <th className="px-4 py-3">កាលបរិច្ឆេទ</th>
                    <th className="px-4 py-3">អ្នកចុះហត្ថលេខាទទួល</th>
                    <th className="px-4 py-3 text-right">សកម្មភាព</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {filteredHandovers.map(ho => (
                    <tr key={ho.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-700/30 transition">
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span
                          className={`px-2.5 py-1 text-[11px] font-extrabold rounded-full flex items-center gap-1 w-fit ${
                            ho.handoverType.includes('ទទួល')
                              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300 border border-emerald-300'
                              : 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 border border-blue-300'
                          }`}
                        >
                          {ho.handoverType.includes('ទទួល') ? <ArrowDownLeft size={14} /> : <ArrowUpRight size={14} />}
                          {ho.handoverType}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-bold text-slate-900 dark:text-white">{ho.itemName}</td>
                      <td className="px-4 py-3">{ho.category}</td>
                      <td className="px-4 py-3 font-extrabold text-slate-900 dark:text-white text-center whitespace-nowrap">
                        {ho.quantity} {ho.unit}
                      </td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{ho.fromParty}</td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{ho.toParty}</td>
                      <td className="px-4 py-3 text-slate-500 whitespace-nowrap">{ho.date}</td>
                      <td className="px-4 py-3 font-bold text-slate-800 dark:text-slate-200 whitespace-nowrap">
                        {ho.receiverSignatureName}
                      </td>
                      <td className="px-4 py-3 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => openEditHandoverModal(ho)}
                            className="p-1.5 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                            title="កែប្រែការប្រគល់-ទទួល"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => deleteMaterialHandover(ho.id)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 transition rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                            title="លុបការប្រគល់-ទទួល"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: FINANCIAL TRANSACTIONS (PB & COMMUNITY LEDGER) */}
      {activeTab === 'finance' && (
        <div className="space-y-6">
          {/* Financial KPI Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700/60 shadow-sm flex items-center gap-4">
              <div className="p-3 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 rounded-2xl">
                <TrendingUp size={28} />
              </div>
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-bold">ចំណូលសរុប (រៀល / ដុល្លារ)</p>
                <h3 className="text-xl font-black text-emerald-600 dark:text-emerald-400 mt-0.5">
                  {totalIncomeRiel.toLocaleString()} ៛
                </h3>
                <p className="text-xs font-semibold text-slate-400">(${Math.round(totalIncomeRiel / 4000)})</p>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700/60 shadow-sm flex items-center gap-4">
              <div className="p-3 bg-rose-100 dark:bg-rose-900/40 text-rose-600 dark:text-rose-400 rounded-2xl">
                <TrendingDown size={28} />
              </div>
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-bold">ចំណាយសរុប (រៀល / ដុល្លារ)</p>
                <h3 className="text-xl font-black text-rose-600 dark:text-rose-400 mt-0.5">
                  {totalExpenseRiel.toLocaleString()} ៛
                </h3>
                <p className="text-xs font-semibold text-slate-400">(${Math.round(totalExpenseRiel / 4000)})</p>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700/60 shadow-sm flex items-center gap-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 rounded-2xl">
                <DollarSign size={28} />
              </div>
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-bold">សុទ្ធសល់សរុប (Net Balance PB)</p>
                <h3 className="text-xl font-black text-blue-600 dark:text-blue-400 mt-0.5">
                  {netBalanceRiel.toLocaleString()} ៛
                </h3>
                <p className="text-xs font-semibold text-slate-400">(${Math.round(netBalanceRiel / 4000)})</p>
              </div>
            </div>
          </div>

          {/* Search Controls */}
          <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700/60 shadow-sm flex items-center justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="ស្វែងរកលេខប័ណ្ណ, បរិយាយ, អ្នកកាន់កាប់..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:text-white"
              />
            </div>
          </div>

          {/* MoEYS Standardized Financial Ledger Table */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700/60 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300">
                <thead className="bg-slate-50 dark:bg-slate-900/60 text-[11px] font-bold text-slate-500 uppercase border-b border-slate-200 dark:border-slate-700/60">
                  <tr>
                    <th className="px-4 py-3">លេខប័ណ្ណ (Voucher)</th>
                    <th className="px-4 py-3">ប្រភេទប្រតិបត្តិការ</th>
                    <th className="px-4 py-3">បរិយាយ / កម្មវិធីស្ដង់ដារ MoEYS</th>
                    <th className="px-4 py-3">ប្រភពថវិកា / កូដចំណាយ</th>
                    <th className="px-4 py-3">ចំនួនប្រាក់ (៛)</th>
                    <th className="px-4 py-3">ចំនួនប្រាក់ ($)</th>
                    <th className="px-4 py-3">កាលបរិច្ឆេទ</th>
                    <th className="px-4 py-3">អ្នកអនុម័ត / ទូទាត់</th>
                    <th className="px-4 py-3 text-center">តម្លាភាព</th>
                    <th className="px-4 py-3 text-right">សកម្មភាព</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {filteredFinance.map(tx => (
                    <tr key={tx.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-700/30 transition">
                      <td className="px-4 py-3 font-mono text-xs font-extrabold text-emerald-600 dark:text-emerald-400 whitespace-nowrap">
                        {tx.voucherNo}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span
                          className={`px-2.5 py-1 text-[11px] font-extrabold rounded-full border ${
                            tx.transactionType.includes('ចំណូល')
                              ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300 border-emerald-300'
                              : 'bg-rose-100 dark:bg-rose-900/40 text-rose-800 dark:text-rose-300 border-rose-300'
                          }`}
                        >
                          {tx.transactionType}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-bold text-slate-900 dark:text-white">
                        {tx.title}
                        {tx.remarks && <p className="text-[11px] font-normal text-slate-500 dark:text-slate-400 mt-0.5">{tx.remarks}</p>}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="px-2.5 py-1 bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 font-semibold rounded-lg border border-purple-200 dark:border-purple-900/40">
                          {tx.category}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-black text-slate-900 dark:text-white whitespace-nowrap">
                        {tx.amountRiel.toLocaleString()} ៛
                      </td>
                      <td className="px-4 py-3 font-bold text-slate-700 dark:text-slate-300 whitespace-nowrap">
                        ${tx.amountUSD}
                      </td>
                      <td className="px-4 py-3 text-slate-500 whitespace-nowrap">{tx.date}</td>
                      <td className="px-4 py-3 font-bold text-slate-800 dark:text-slate-200 whitespace-nowrap">
                        {tx.handledBy}
                      </td>
                      <td className="px-4 py-3 text-center whitespace-nowrap">
                        <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 rounded border border-emerald-300">
                          បិទផ្សាយតម្លាភាព
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => openEditTxModal(tx)}
                            className="p-1.5 text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                            title="កែប្រែប្រតិបត្តិការ"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => deleteFinancialTransaction(tx.id)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 transition rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                            title="លុបប្រតិបត្តិការ"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: OFFICIAL PRINTABLE REPORT & TRANSPARENCY POSTING */}
      {activeTab === 'report' && (
        <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-200 dark:border-slate-700/60 shadow-lg space-y-6">
          {/* Top-Most Kingdom Motto (Font Khmer OS Muol Light) */}
          <div className="text-center font-moul space-y-1 mb-4">
            <h2 className="text-base font-bold text-slate-900 dark:text-white tracking-wide">ព្រះរាជាណាចក្រកម្ពុជា</h2>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white tracking-wide">ជាតិ សាសនា ព្រះមហាក្សត្រ</h3>
            <div className="flex justify-center items-center my-1 text-xs">
              <span className="font-serif text-slate-600 dark:text-slate-400">❖ ❖ ❖</span>
            </div>
          </div>

          {/* Header Document */}
          <div className="text-center border-b border-slate-200 dark:border-slate-700 pb-6 space-y-2 font-siemreap">
            <h2 className="text-sm font-bold text-slate-700 dark:text-slate-300">
              ក្រសួងអប់រំ យុវជន និងកីឡា (MoEYS) • មន្ទីរអប់រំ យុវជន និងកីឡា ខេត្តបាត់ដំបង
            </h2>
            <h1 className="text-xl font-bold font-moul text-purple-700 dark:text-purple-400 mt-2">
              របាយការណ៍សង្ខេបសារពើភ័ណ្ឌ & ផ្ទាំងតម្លាភាពហិរញ្ញវត្ថុ ថវិការដ្ឋ (PB)
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              សាលាបឋមសិក្សា អន្លង់តាម៉ី (ភូមិចំការស្វាយ & ភូមិអន្លង់តាម៉ី ឃុំឈើទាល ស្រុកបាណន់) • ឆ្នាំសិក្សា ២០២៥-២០២៦
            </p>
          </div>

          {/* Standard 4 KPIs Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 space-y-3">
              <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Boxes className="text-cyan-600" size={18} />
                <span>សង្ខេបទ្រព្យសម្បត្តិសារពើភ័ណ្ឌសាលា (សូចនាករ ៤.២.៣)</span>
              </h4>
              <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                <div className="flex justify-between">
                  <span>ចំនួនសម្ភារៈសារពើភ័ណ្ឌសរុប៖</span>
                  <span className="font-bold">{totalAssetsCount} គ្រឿង/ខ្នាត</span>
                </div>
                <div className="flex justify-between">
                  <span>តម្លៃប៉ាន់ស្មានសរុប៖</span>
                  <span className="font-bold text-cyan-600">{totalAssetsValueRiel.toLocaleString()} ៛</span>
                </div>
                <div className="flex justify-between">
                  <span>ស្ថានភាពកូដសូជី Asset Tagging៖</span>
                  <span className="font-bold text-emerald-600">១០០% មានកូដសូជី</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 space-y-3">
              <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <DollarSign className="text-emerald-600" size={18} />
                <span>សង្ខេបហិរញ្ញវត្ថុ ថវិការដ្ឋ PB & គគថ (សូចនាករ ៤.២.២)</span>
              </h4>
              <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                <div className="flex justify-between">
                  <span>ចំណូលថវិការដ្ឋ PB & វិភាគទានសរុប៖</span>
                  <span className="font-bold text-emerald-600">{totalIncomeRiel.toLocaleString()} ៛</span>
                </div>
                <div className="flex justify-between">
                  <span>ចំណាយប្រតិបត្តិការសរុប៖</span>
                  <span className="font-bold text-rose-600">{totalExpenseRiel.toLocaleString()} ៛</span>
                </div>
                <div className="flex justify-between">
                  <span>សុទ្ធសល់សរុប (Net Balance)៖</span>
                  <span className="font-bold text-blue-600">{netBalanceRiel.toLocaleString()} ៛</span>
                </div>
              </div>
            </div>
          </div>

          {/* Signatures Footer */}
          <div className="grid grid-cols-2 gap-8 pt-8 border-t border-slate-200 dark:border-slate-700 text-center text-xs">
            <div>
              <p className="font-bold text-slate-900 dark:text-white">បានឃើញ និងឯកភាព</p>
              <p className="text-slate-500">នាយកសាលាបឋមសិក្សា អន្លង់តាម៉ី</p>
              <div className="h-16"></div>
              <p className="font-bold text-slate-900 dark:text-white">ឈិត សារ៉ាំ</p>
            </div>
            <div>
              <p className="font-bold text-slate-900 dark:text-white">រៀបចំដោយ</p>
              <p className="text-slate-500">លេខា & បេឡាសាលារៀន</p>
              <div className="h-16"></div>
              <p className="font-bold text-slate-900 dark:text-white">វ៉ិត ជីវន្ថា</p>
            </div>
          </div>
        </div>
      )}

      {/* Modal Add / Edit Asset */}
      {isAssetModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-700/60">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
              {editingAssetId ? 'កែប្រែសម្ភារៈសារពើភ័ណ្ឌ' : 'បន្ថែមសម្ភារៈសារពើភ័ណ្ឌស្ដង់ដារ'}
            </h2>
            <form onSubmit={handleSaveAsset} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  ឈ្មោះសម្ភារៈ / ឧបករណ៍ *
                </label>
                <input
                  type="text"
                  required
                  value={assetName}
                  onChange={e => setAssetName(e.target.value)}
                  placeholder="ឧ. កញ្ចប់ Smart TV ៥៥ អ៊ីញ..."
                  className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-xl bg-slate-50 dark:bg-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">ប្រភេទ</label>
                  <select
                    value={assetCategory}
                    onChange={e => setAssetCategory(e.target.value as any)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-xl bg-slate-50 dark:bg-slate-900 dark:text-white"
                  >
                    <option value="គ្រឿងសង្ហារិម">គ្រឿងសង្ហារិម</option>
                    <option value="ឧបករណ៍បច្ចេកវិទ្យា">ឧបករណ៍បច្ចេកវិទ្យា (ICT)</option>
                    <option value="ឧបករណ៍បង្រៀន">ឧបករណ៍បង្រៀន (STEM)</option>
                    <option value="សម្ភារកីឡា">សម្ភារកីឡា</option>
                    <option value="សម្ភារអនាម័យ">សម្ភារអនាម័យ (WASH)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">បរិមាណ (គ្រឿង)</label>
                  <input
                    type="number"
                    min={1}
                    value={assetQuantity}
                    onChange={e => setAssetQuantity(Number(e.target.value))}
                    className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-xl bg-slate-50 dark:bg-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">គុណភាព</label>
                  <select
                    value={assetCondition}
                    onChange={e => setAssetCondition(e.target.value as any)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-xl bg-slate-50 dark:bg-slate-900 dark:text-white"
                  >
                    <option value="ល្អ (Good)">ល្អ (Good)</option>
                    <option value="មធ្យម (Fair)">មធ្យម (Fair)</option>
                    <option value="ត្រូវការជួសជុល (Needs Repair)">ត្រូវការជួសជុល</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">តម្លៃប៉ាន់ស្មាន (៛)</label>
                  <input
                    type="number"
                    value={valueRiel}
                    onChange={e => setValueRiel(Number(e.target.value))}
                    className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-xl bg-slate-50 dark:bg-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">ទីតាំង / បន្ទប់</label>
                <input
                  type="text"
                  value={locationRoom}
                  onChange={e => setLocationRoom(e.target.value)}
                  placeholder="ឧ. បន្ទប់កុំព្យូទ័រ ICT / បណ្ណាល័យ..."
                  className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-xl bg-slate-50 dark:bg-slate-900 dark:text-white"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
                <button
                  type="button"
                  onClick={() => {
                    setIsAssetModalOpen(false);
                    resetAssetForm();
                  }}
                  className="px-4 py-2 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl"
                >
                  បោះបង់
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-semibold bg-cyan-600 hover:bg-cyan-700 text-white rounded-xl shadow-md"
                >
                  {editingAssetId ? 'កែប្រែទិន្នន័យ' : 'រក្សាទុកសម្ភារៈ'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Add / Edit Handover */}
      {isHandoverModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-700/60">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
              {editingHandoverId ? 'កែប្រែការប្រគល់-ទទួលសម្ភារៈ' : 'បន្ថែមការប្រគល់-ទទួលសម្ភារៈ'}
            </h2>
            <form onSubmit={handleSaveHandover} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">ប្រភេទ</label>
                  <select
                    value={handoverType}
                    onChange={e => setHandoverType(e.target.value as any)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-xl bg-slate-50 dark:bg-slate-900 dark:text-white"
                  >
                    <option value="ទទួល (Receive)">ទទួល (Receive)</option>
                    <option value="ប្រគល់ (Distribute)">ប្រគល់ (Distribute)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">ជំពូក</label>
                  <select
                    value={hoCategory}
                    onChange={e => setHoCategory(e.target.value as any)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-xl bg-slate-50 dark:bg-slate-900 dark:text-white"
                  >
                    <option value="សៀវភៅសិក្សា">សៀវភៅសិក្សា</option>
                    <option value="សម្ភារឧបទេស">សម្ភារឧបទេស / EGR</option>
                    <option value="ឧបករណ៍បច្ចេកវិទ្យា">ឧបករណ៍បច្ចេកវិទ្យា</option>
                    <option value="ឧបករណ៍កីឡា">ឧបករណ៍កីឡា</option>
                    <option value="សម្ភារការិយាល័យ">សម្ភារការិយាល័យ</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  ឈ្មោះសម្ភារៈ / សៀវភៅ *
                </label>
                <input
                  type="text"
                  required
                  value={itemName}
                  onChange={e => setItemName(e.target.value)}
                  placeholder="ឧ. កញ្ចប់សម្ភារៈអំណាន EGR ថ្នាក់ទី១-៣..."
                  className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-xl bg-slate-50 dark:bg-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">បរិមាណ</label>
                  <input
                    type="number"
                    min={1}
                    value={hoQuantity}
                    onChange={e => setHoQuantity(Number(e.target.value))}
                    className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-xl bg-slate-50 dark:bg-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">ខ្នាត</label>
                  <input
                    type="text"
                    value={unit}
                    onChange={e => setUnit(e.target.value)}
                    placeholder="ឧ. ក្បាល / កញ្ចប់ / គ្រឿង"
                    className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-xl bg-slate-50 dark:bg-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">ប្រគល់ពី</label>
                  <input
                    type="text"
                    value={fromParty}
                    onChange={e => setFromParty(e.target.value)}
                    placeholder="ឧ. មន្ទីរអប់រំខេត្ត / WFP..."
                    className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-xl bg-slate-50 dark:bg-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">ជូនទៅ</label>
                  <input
                    type="text"
                    value={toParty}
                    onChange={e => setToParty(e.target.value)}
                    placeholder="ឧ. សាលាបឋមសិក្សា អន្លង់តាម៉ី..."
                    className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-xl bg-slate-50 dark:bg-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">អ្នកចុះហត្ថលេខាទទួល</label>
                <input
                  type="text"
                  value={receiverSignatureName}
                  onChange={e => setReceiverSignatureName(e.target.value)}
                  placeholder="ឧ. លោកនាយក ឈិត សារ៉ាំ..."
                  className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-xl bg-slate-50 dark:bg-slate-900 dark:text-white"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
                <button
                  type="button"
                  onClick={() => {
                    setIsHandoverModalOpen(false);
                    resetHandoverForm();
                  }}
                  className="px-4 py-2 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl"
                >
                  បោះបង់
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md"
                >
                  {editingHandoverId ? 'កែប្រែទិន្នន័យ' : 'រក្សាទុកប្រគល់-ទទួល'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Add / Edit Finance */}
      {isTxModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-700/60">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
              {editingTxId ? 'កែប្រែប្រតិបត្តិការថវិការដ្ឋ (PB)' : 'បន្ថែមប្រតិបត្តិការ ថវិការដ្ឋ (PB)'}
            </h2>
            <form onSubmit={handleSaveTx} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">ប្រភេទ</label>
                  <select
                    value={txType}
                    onChange={e => setTxType(e.target.value as any)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-xl bg-slate-50 dark:bg-slate-900 dark:text-white"
                  >
                    <option value="ចំណូល (Income)">ចំណូល (Income)</option>
                    <option value="ចំណាយ (Expense)">ចំណាយ (Expense)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">ប្រភព / ជំពូក</label>
                  <select
                    value={txCategory}
                    onChange={e => setTxCategory(e.target.value as any)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-xl bg-slate-50 dark:bg-slate-900 dark:text-white"
                  >
                    <option value="ថវិការដ្ឋ (PB)">ថវិការដ្ឋ (PB)</option>
                    <option value="វិភាគទានសហគមន៍">វិភាគទានសហគមន៍ / គគថ</option>
                    <option value="ជំនួយសប្បុរសជន">ជំនួយសប្បុរសជន / IDPoor</option>
                    <option value="ចំណាយសម្ភារសិក្សា">ចំណាយសម្ភារសិក្សា (កូដ ៦០)</option>
                    <option value="ចំណាយជួសជុល">ចំណាយថែទាំជួសជុល (កូដ ៦១)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  បរិយាយ / កម្មវិធី *
                </label>
                <input
                  type="text"
                  required
                  value={txTitle}
                  onChange={e => setTxTitle(e.target.value)}
                  placeholder="ឧ. ថវិកាកម្មវិធី PB ពីរដ្ឋ ឆមាសទី១..."
                  className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-xl bg-slate-50 dark:bg-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">ចំនួនប្រាក់ (៛)</label>
                  <input
                    type="number"
                    value={amountRiel}
                    onChange={e => {
                      const r = Number(e.target.value);
                      setAmountRiel(r);
                      setAmountUSD(Math.round(r / 4000));
                    }}
                    className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-xl bg-slate-50 dark:bg-slate-900 dark:text-white font-bold text-emerald-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">ចំនួនប្រាក់ ($)</label>
                  <input
                    type="number"
                    value={amountUSD}
                    onChange={e => {
                      const u = Number(e.target.value);
                      setAmountUSD(u);
                      setAmountRiel(u * 4000);
                    }}
                    className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-xl bg-slate-50 dark:bg-slate-900 dark:text-white font-bold text-emerald-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">អ្នកកាន់កាប់ / ទូទាត់</label>
                <input
                  type="text"
                  value={handledBy}
                  onChange={e => setHandledBy(e.target.value)}
                  placeholder="ឧ. លោកនាយក ឈិត សារ៉ាំ..."
                  className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-xl bg-slate-50 dark:bg-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">កំណត់ចំណាំ / បិទផ្សាយ</label>
                <input
                  type="text"
                  value={remarks}
                  onChange={e => setRemarks(e.target.value)}
                  placeholder="ឧ. បិទផ្សាយលើផ្ទាំងតម្លាភាព គគស..."
                  className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-xl bg-slate-50 dark:bg-slate-900 dark:text-white"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
                <button
                  type="button"
                  onClick={() => {
                    setIsTxModalOpen(false);
                    resetTxForm();
                  }}
                  className="px-4 py-2 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl"
                >
                  បោះបង់
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-md"
                >
                  {editingTxId ? 'កែប្រែទិន្នន័យ' : 'រក្សាទុកប្រតិបត្តិការ'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
