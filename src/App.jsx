import { useState } from 'react';
import VesselInfo from './components/VesselInfo';
import TripInfo from './components/TripInfo';
import PersonsOnBoard from './components/PersonsOnBoard';
import SafetyEquipment from './components/SafetyEquipment';
import VehicleInfo from './components/VehicleInfo';
import EmergencyContact from './components/EmergencyContact';
import PrintPreview from './components/PrintPreview';

const EMPTY_PERSON = { name: '', dob: '', phone: '', address: '', medicalNotes: '' };

const INITIAL_STATE = {
  vessel: {
    name: '', registration: '', type: '', make: '', model: '', year: '',
    length: '', hullColor: '', deckColor: '', engineType: '', engineHp: '',
    fuelCapacity: '', callSign: '', cellPhone: '',
  },
  trip: {
    departureLocation: '', destination: '', departureTime: '', returnTime: '',
    route: '', alternateDestination: '', fuelStops: '', leftWithName: '', leftWithPhone: '',
  },
  persons: [{ ...EMPTY_PERSON }],
  safety: {
    equipment: {},
    lifejacketCount: '', vhfChannel: '', epirbId: '',
  },
  vehicle: {
    vehicleMake: '', vehicleModel: '', vehicleYear: '', vehicleColor: '',
    licensePlate: '', state: '', parkedAt: '', trailerPlate: '',
  },
  emergency: {
    contactName: '', relationship: '', phone: '', altPhone: '', email: '',
    actions: '', coastGuardContact: '', notes: '',
  },
};

const STORAGE_KEY = 'floatPlanDraft';

function loadDraft() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export default function App() {
  const [plan, setPlan] = useState(() => loadDraft() ?? INITIAL_STATE);
  const [showPrint, setShowPrint] = useState(false);
  const [saved, setSaved] = useState(false);

  const update = (section) => (value) => {
    setPlan((prev) => ({ ...prev, [section]: value }));
    setSaved(false);
  };

  const handleSaveDraft = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(plan));
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleClear = () => {
    if (window.confirm('Clear all fields and start over?')) {
      localStorage.removeItem(STORAGE_KEY);
      setPlan(INITIAL_STATE);
      setShowPrint(false);
    }
  };

  const handlePrint = () => {
    setShowPrint(true);
    setTimeout(() => window.print(), 300);
  };

  if (showPrint) {
    return (
      <div>
        <div className="no-print flex items-center gap-3 px-6 py-3 bg-blue-700 text-white">
          <button
            onClick={() => setShowPrint(false)}
            className="text-sm font-medium hover:underline"
          >
            ← Back to Form
          </button>
          <span className="text-sm opacity-70">|</span>
          <button
            onClick={() => window.print()}
            className="text-sm font-medium hover:underline"
          >
            🖨️ Print / Save as PDF
          </button>
        </div>
        <PrintPreview plan={plan} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-blue-800 text-white shadow-lg no-print">
        <div className="max-w-4xl mx-auto px-4 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">⚓</span>
            <div>
              <h1 className="text-xl font-bold tracking-tight">Float Plan</h1>
              <p className="text-blue-200 text-xs">Let someone know where you&apos;re going before you go</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleSaveDraft}
              className="text-sm bg-blue-700 hover:bg-blue-600 border border-blue-500 px-4 py-2 rounded-lg font-medium transition-colors"
            >
              {saved ? '✓ Saved' : 'Save Draft'}
            </button>
            <button
              type="button"
              onClick={handleClear}
              className="text-sm text-blue-200 hover:text-white px-3 py-2 rounded-lg font-medium transition-colors"
            >
              Clear
            </button>
          </div>
        </div>
      </header>

      {/* Form */}
      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 text-sm text-blue-800 no-print">
          <strong>How to use:</strong> Fill out each section below, then click{' '}
          <strong>Preview &amp; Print</strong> to generate a printable float plan. Leave a copy with
          a trusted person ashore before heading out.
        </div>

        <form onSubmit={(e) => e.preventDefault()}>
          <VesselInfo data={plan.vessel} onChange={update('vessel')} />
          <TripInfo data={plan.trip} onChange={update('trip')} />
          <PersonsOnBoard persons={plan.persons} onChange={update('persons')} />
          <SafetyEquipment data={plan.safety} onChange={update('safety')} />
          <VehicleInfo data={plan.vehicle} onChange={update('vehicle')} />
          <EmergencyContact data={plan.emergency} onChange={update('emergency')} />
        </form>

        {/* Action bar */}
        <div className="no-print sticky bottom-0 bg-white border-t border-slate-200 shadow-lg px-4 py-3 -mx-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleSaveDraft}
              className="text-sm bg-slate-100 hover:bg-slate-200 border border-slate-300 px-4 py-2 rounded-lg font-medium text-slate-700 transition-colors"
            >
              {saved ? '✓ Draft Saved' : 'Save Draft'}
            </button>
            <span className="text-xs text-slate-400">Drafts are saved locally in your browser</span>
          </div>
          <button
            type="button"
            onClick={handlePrint}
            className="bg-blue-700 hover:bg-blue-800 text-white font-semibold px-6 py-2 rounded-lg shadow transition-colors"
          >
            🖨️ Preview &amp; Print
          </button>
        </div>
      </main>
    </div>
  );
}
