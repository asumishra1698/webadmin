import React, { useRef, useEffect } from "react";

const colors = [
  "#000000", "#FF0000", "#008000", "#0000FF", "#FFA500", "#800080", "#00CED1", "#FF1493"
];
const sizes = [
  { label: "Small", value: "1" },
  { label: "Normal", value: "3" },
  { label: "Large", value: "5" },
  { label: "X-Large", value: "7" }
];

const CustomEditor: React.FC<{
  value: string;
  onChange: (val: string) => void;
}> = ({ value, onChange }) => {
  const ref = useRef<HTMLDivElement>(null);

  const format = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    if (ref.current) {
      onChange(ref.current.innerHTML);
    }
  };

  useEffect(() => {
    if (ref.current && ref.current.innerHTML !== value) {
      ref.current.innerHTML = value;
    }
  }, [value]);

  const handleInput = () => {
    if (ref.current) {
      onChange(ref.current.innerHTML);
    }
  };

  return (
    <div>
      <div className="flex gap-2 mb-2 flex-wrap items-center">
        <button type="button" onClick={() => format("bold")} title="Bold" className="px-2 py-1 border rounded hover:bg-gray-100 font-bold">B</button>
        <button type="button" onClick={() => format("italic")} title="Italic" className="px-2 py-1 border rounded hover:bg-gray-100 italic">I</button>
        <button type="button" onClick={() => format("underline")} title="Underline" className="px-2 py-1 border rounded hover:bg-gray-100 underline">U</button>
        <button type="button" onClick={() => format("insertOrderedList")} title="Numbered List" className="px-2 py-1 border rounded hover:bg-gray-100">OL</button>
        <button type="button" onClick={() => format("insertUnorderedList")} title="Bullet List" className="px-2 py-1 border rounded hover:bg-gray-100">UL</button>
        {[1,2,3,4,5,6].map(h => (
          <button
            key={h}
            type="button"
            onClick={() => format("formatBlock", `<h${h}>`)}
            title={`H${h}`}
            className="px-2 py-1 border rounded hover:bg-gray-100 font-bold"
          >{`H${h}`}</button>
        ))}
        <button type="button" onClick={() => format("formatBlock", "<p>")} title="Paragraph" className="px-2 py-1 border rounded hover:bg-gray-100">P</button>
        <button type="button" onClick={() => format("createLink", prompt("Enter URL") || "")} title="Link" className="px-2 py-1 border rounded hover:bg-gray-100">🔗</button>
        <select
          onChange={e => format("foreColor", e.target.value)}
          defaultValue=""
          className="border rounded px-2 py-1"
          title="Text Color"
        >
          <option value="" disabled>Text Color</option>
          {colors.map(c => (
            <option key={c} value={c} style={{ color: c }}>{c}</option>
          ))}
        </select>
        <select
          onChange={e => format("fontSize", e.target.value)}
          defaultValue=""
          className="border rounded px-2 py-1"
          title="Text Size"
        >
          <option value="" disabled>Text Size</option>
          {sizes.map(s => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </select>
        <button type="button" onClick={() => format("removeFormat")} title="Clear" className="px-2 py-1 border rounded hover:bg-gray-100">Clear</button>
      </div>
      <div
        ref={ref}
        className="border rounded px-3 py-2 min-h-[120px] bg-white"
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        style={{ outline: "none" }}
        spellCheck={true}
      />
    </div>
  );
};

export default CustomEditor;