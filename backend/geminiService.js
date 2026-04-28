require('dotenv').config();

// =====================================================
// 🔥 MAIN FUNCTION (NO GEMINI — SMART LOGIC)
// =====================================================
const classifyIncident = async (description, floor, type) => {
  try {
    console.log("📥 Incoming Incident:", description, floor, type);

    // Directly use smart fallback (acts like AI)
    return smartResponse(description, floor, type);

  } catch (err) {
    console.error("❌ ERROR:", err.message);
    return smartResponse(description, floor, type);
  }
};

// =====================================================
// 🔥 SMART AI-LIKE RESPONSE (MAIN ENGINE NOW)
// =====================================================
const smartResponse = (description, floor, type) => {
  const desc = description.toLowerCase();

  let crisis_type = type || "other";
  let severity = "YELLOW";
  let sop = [];
  let notify = ["manager"];
  let summary = "Emergency reported";

  // 🔥 FIRE
  if (desc.includes("fire") || desc.includes("smoke") || desc.includes("burn")) {
    crisis_type = "fire";
    severity = "RED";
    notify = ["fire_brigade", "manager"];
    sop = [
      "Activate fire alarm immediately",
      "Evacuate all people from affected floor",
      "Call fire brigade",
      "Use extinguisher if safe",
      "Avoid elevators",
      "Assist injured persons"
    ];
    summary = "Fire detected — immediate evacuation required";
  }

  // 🚑 MEDICAL
  else if (
    desc.includes("unconscious") ||
    desc.includes("injury") ||
    desc.includes("bleeding") ||
    desc.includes("collapse")
  ) {
    crisis_type = "medical";
    severity = "RED";
    notify = ["ambulance", "manager"];
    sop = [
      "Check responsiveness",
      "Call ambulance immediately",
      "Provide first aid",
      "Keep patient stable",
      "Clear surrounding area",
      "Stay with patient until help arrives"
    ];
    summary = "Medical emergency — urgent assistance required";
  }

  // 🔒 SECURITY
  else if (
    desc.includes("intruder") ||
    desc.includes("attack") ||
    desc.includes("weapon") ||
    desc.includes("threat")
  ) {
    crisis_type = "security";
    severity = "RED";
    notify = ["police", "manager"];
    sop = [
      "Alert security team",
      "Lock nearby access points",
      "Avoid confrontation",
      "Call police immediately",
      "Guide people to safe areas",
      "Monitor situation"
    ];
    summary = "Security threat detected — authorities notified";
  }

  // 🌊 FLOOD / WATER
  else if (
    desc.includes("water") ||
    desc.includes("flood") ||
    desc.includes("leak")
  ) {
    crisis_type = "flood";
    severity = "YELLOW";
    notify = ["maintenance", "manager"];
    sop = [
      "Identify water source",
      "Shut off main supply if possible",
      "Avoid electrical contact",
      "Move valuables to safe area",
      "Inform maintenance team",
      "Monitor situation"
    ];
    summary = "Water leakage detected — maintenance required";
  }

  // =====================================================
  // ✅ FINAL RESPONSE
  // =====================================================
  return {
    crisis_type,
    severity,
    affected_zone: floor ? `Floor ${floor}` : "Unknown area",
    sop,
    notify,
    summary
  };
};

module.exports = { classifyIncident };