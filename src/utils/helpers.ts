
export const getBaseRadius = (h?: number) => {
    if (h == null) return 6;
    return Math.min(30, Math.max(6, h * 40));
};

export const getColor = (h?: number) => {
    if (h == null) return "#999";
    if (h < 0.2) return "#4CAF50";      // safe
    if (h < 0.5) return "#FFC107";      // caution
    if (h < 1.0) return "#FF9800";      // warning
    return "#F44336";                   // danger
};