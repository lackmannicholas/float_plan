function formatDateTime(dt) {
  if (!dt) return '—';
  try {
    return new Date(dt).toLocaleString(undefined, {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  } catch {
    return dt;
  }
}

function Section({ title, children }) {
  return (
    <div className="mb-4 break-inside-avoid">
      <h3 className="text-xs font-bold uppercase tracking-widest text-blue-700 border-b border-blue-200 pb-1 mb-2">
        {title}
      </h3>
      {children}
    </div>
  );
}

function Row({ label, value }) {
  if (!value) return null;
  return (
    <div className="flex gap-2 text-sm py-0.5">
      <span className="text-slate-500 shrink-0 w-44">{label}:</span>
      <span className="text-slate-800 font-medium">{value}</span>
    </div>
  );
}

function CheckItem({ checked, label }) {
  return (
    <span className={`inline-flex items-center gap-1 text-xs mr-3 mb-1 ${checked ? 'text-slate-800' : 'text-slate-400 line-through'}`}>
      {checked ? '✓' : '✗'} {label}
    </span>
  );
}

const EQUIPMENT_LABELS = {
  lifejackets: 'Life Jackets',
  throwable: 'Throwable Device',
  visualSignals: 'Visual Signals',
  fireExtinguisher: 'Fire Extinguisher',
  vhfRadio: 'VHF Radio',
  epirb: 'EPIRB / PLB',
  anchor: 'Anchor',
  firstAid: 'First Aid',
  flashlight: 'Flashlight',
  toolKit: 'Tool Kit',
  bilgePump: 'Bilge Pump',
  horn: 'Horn/Whistle',
  compass: 'Compass',
  gps: 'GPS',
  raft: 'Life Raft',
  foodWater: 'Food & Water',
};

export default function PrintPreview({ plan }) {
  const { vessel, trip, persons, safety, vehicle, emergency } = plan;

  return (
    <div className="bg-white text-slate-800 p-8 max-w-4xl mx-auto font-sans text-sm" id="print-preview">
      {/* Header */}
      <div className="flex items-start justify-between border-b-2 border-blue-700 pb-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-blue-800 tracking-tight">Float Plan</h1>
          <p className="text-slate-500 text-xs mt-1">Keep a copy ashore — do not take this on your vessel</p>
        </div>
        <div className="text-right text-xs text-slate-500">
          <p>Date Prepared:</p>
          <p className="font-medium text-slate-700">{new Date().toLocaleDateString()}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
        {/* Vessel */}
        <Section title="Vessel">
          <Row label="Name" value={vessel.name} />
          <Row label="Registration #" value={vessel.registration} />
          <Row label="Type" value={vessel.type} />
          <Row label="Make / Model" value={[vessel.make, vessel.model].filter(Boolean).join(' ')} />
          <Row label="Year" value={vessel.year} />
          <Row label="Length (ft)" value={vessel.length} />
          <Row label="Hull Color" value={vessel.hullColor} />
          <Row label="Deck Color" value={vessel.deckColor} />
          <Row label="Engine" value={[vessel.engineType, vessel.engineHp && `${vessel.engineHp} HP`].filter(Boolean).join(', ')} />
          <Row label="Fuel Capacity" value={vessel.fuelCapacity && `${vessel.fuelCapacity} gal`} />
          <Row label="Call Sign / MMSI" value={vessel.callSign} />
          <Row label="Cell Phone" value={vessel.cellPhone} />
        </Section>

        {/* Trip */}
        <Section title="Trip Details">
          <Row label="Departure" value={trip.departureLocation} />
          <Row label="Destination" value={trip.destination} />
          <Row label="Departure Time" value={formatDateTime(trip.departureTime)} />
          <Row label="Expected Return" value={formatDateTime(trip.returnTime)} />
          <Row label="Alternate Destination" value={trip.alternateDestination} />
          <Row label="Fuel Stop(s)" value={trip.fuelStops} />
          <Row label="Planned Route" value={trip.route} />
          <Row label="Plan Left With" value={trip.leftWithName} />
          <Row label="Left With Phone" value={trip.leftWithPhone} />
        </Section>

        {/* Safety Equipment */}
        <Section title="Safety Equipment">
          <div className="flex flex-wrap mb-2">
            {Object.entries(EQUIPMENT_LABELS).map(([key, label]) => (
              <CheckItem key={key} checked={!!safety.equipment?.[key]} label={label} />
            ))}
          </div>
          <Row label="Life Jacket Count" value={safety.lifejacketCount} />
          <Row label="VHF Channel" value={safety.vhfChannel} />
          <Row label="EPIRB / PLB ID" value={safety.epirbId} />
        </Section>

        {/* Vehicle */}
        <Section title="Tow Vehicle / Trailer">
          <Row label="Vehicle" value={[vehicle.vehicleYear, vehicle.vehicleMake, vehicle.vehicleModel].filter(Boolean).join(' ')} />
          <Row label="Color" value={vehicle.vehicleColor} />
          <Row label="License Plate" value={vehicle.licensePlate && `${vehicle.licensePlate}${vehicle.state ? ` (${vehicle.state})` : ''}`} />
          <Row label="Trailer Plate" value={vehicle.trailerPlate} />
          <Row label="Parked At" value={vehicle.parkedAt} />
        </Section>
      </div>

      {/* Persons */}
      <Section title={`Persons on Board (${persons.filter(p => p.name).length})`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {persons.filter(p => p.name).map((p, i) => (
            <div key={i} className="border border-slate-200 rounded p-3">
              <p className="font-semibold text-slate-800 mb-1">{p.name}</p>
              {p.dob && <p className="text-xs text-slate-500">DOB: {p.dob}</p>}
              {p.phone && <p className="text-xs text-slate-500">Phone: {p.phone}</p>}
              {p.address && <p className="text-xs text-slate-500">Address: {p.address}</p>}
              {p.medicalNotes && <p className="text-xs text-amber-700">Medical: {p.medicalNotes}</p>}
            </div>
          ))}
        </div>
      </Section>

      {/* Emergency */}
      <Section title="Emergency Contact & Instructions">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
          <div>
            <Row label="Contact Name" value={emergency.contactName} />
            <Row label="Relationship" value={emergency.relationship} />
            <Row label="Primary Phone" value={emergency.phone} />
            <Row label="Alternate Phone" value={emergency.altPhone} />
            <Row label="Email" value={emergency.email} />
            <Row label="Coast Guard / Local Authority" value={emergency.coastGuardContact} />
          </div>
          <div>
            {emergency.actions && (
              <div className="mb-2">
                <p className="text-xs text-slate-500 font-medium mb-1">If overdue — actions to take:</p>
                <p className="text-sm text-slate-800 bg-amber-50 border border-amber-200 rounded p-2">{emergency.actions}</p>
              </div>
            )}
            {emergency.notes && (
              <div>
                <p className="text-xs text-slate-500 font-medium mb-1">Additional notes:</p>
                <p className="text-sm text-slate-800">{emergency.notes}</p>
              </div>
            )}
          </div>
        </div>
      </Section>

      {/* Signature line */}
      <div className="border-t border-slate-200 pt-4 mt-4 grid grid-cols-2 gap-8 text-xs text-slate-500">
        <div>
          <div className="border-b border-slate-400 mb-1 h-8"></div>
          <p>Skipper Signature</p>
        </div>
        <div>
          <div className="border-b border-slate-400 mb-1 h-8"></div>
          <p>Date / Time Departing</p>
        </div>
      </div>
    </div>
  );
}
