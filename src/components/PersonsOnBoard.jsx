import FormSection from './FormSection';
import Field, { Input } from './FormControls';

function PersonRow({ person, index, onChange, onRemove, isOnly }) {
  const handle = (field) => (e) => onChange(index, { ...person, [field]: e.target.value });

  return (
    <div className="border border-slate-200 rounded-lg p-4 relative">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-semibold text-blue-700">Person {index + 1}</span>
        {!isOnly && (
          <button
            type="button"
            onClick={() => onRemove(index)}
            className="text-red-500 hover:text-red-700 text-sm font-medium no-print"
          >
            Remove
          </button>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <Field label="Full Name" required={index === 0}>
          <Input value={person.name} onChange={handle('name')} placeholder="Full name" required={index === 0} />
        </Field>
        <Field label="Date of Birth">
          <Input type="date" value={person.dob} onChange={handle('dob')} />
        </Field>
        <Field label="Phone Number">
          <Input type="tel" value={person.phone} onChange={handle('phone')} placeholder="555-123-4567" />
        </Field>
        <Field label="Address" className="sm:col-span-2">
          <Input value={person.address} onChange={handle('address')} placeholder="Street, City, State ZIP" />
        </Field>
        <Field label="Medical Conditions / Notes">
          <Input value={person.medicalNotes} onChange={handle('medicalNotes')} placeholder="e.g. allergic to penicillin" />
        </Field>
      </div>
    </div>
  );
}

export default function PersonsOnBoard({ persons, onChange }) {
  const updatePerson = (index, updated) => {
    const next = [...persons];
    next[index] = updated;
    onChange(next);
  };

  const removePerson = (index) => {
    onChange(persons.filter((_, i) => i !== index));
  };

  const addPerson = () => {
    onChange([...persons, { name: '', dob: '', phone: '', address: '', medicalNotes: '' }]);
  };

  return (
    <FormSection title="Persons on Board" icon="👥">
      <div className="flex flex-col gap-4">
        {persons.map((p, i) => (
          <PersonRow
            key={i}
            person={p}
            index={i}
            onChange={updatePerson}
            onRemove={removePerson}
            isOnly={persons.length === 1}
          />
        ))}
        <button
          type="button"
          onClick={addPerson}
          className="no-print mt-1 self-start flex items-center gap-2 text-sm font-medium text-blue-700 hover:text-blue-900 border border-blue-300 rounded-lg px-4 py-2 hover:bg-blue-50 transition-colors"
        >
          + Add Another Person
        </button>
      </div>
    </FormSection>
  );
}
