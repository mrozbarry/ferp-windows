export const interactionCreate = (type) => ({ type });

export const interactionCreateFrom = (type, { rootWindow, position, relativeMouseToWindow }) => ({
  ...interactionCreate(type),
  rootWindow,
  position,
  relativeMouseToWindow,
});

export const interactionUpdate = (interaction, position) => ({
  ...interaction,
  position,
});


