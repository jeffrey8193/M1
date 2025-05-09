import * as Yup from 'yup';

export const AddStuffSchema = Yup.object({
  name: Yup.string().required(),
  quantity: Yup.number().positive().required(),
  condition: Yup.string().oneOf(['excellent', 'good', 'fair', 'poor']).required(),
  owner: Yup.string().required(),
});

export const EditStuffSchema = Yup.object({
  id: Yup.number().required(),
  name: Yup.string().required(),
  quantity: Yup.number().positive().required(),
  condition: Yup.string().oneOf(['excellent', 'good', 'fair', 'poor']).required(),
  owner: Yup.string().required(),
});

export const AddBirdSchema = Yup.object({
  imagepath: Yup.string().url().required(),
  name: Yup.string().required(),
  sciname: Yup.string().required(),
  time: Yup.string().required(),
  user: Yup.string().required(),
  description: Yup.string().required(),
  owner: Yup.string().required(),
});

export const EditBirdSchema = Yup.object({
  id: Yup.number().required(),
  imagepath: Yup.string().url().required(),
  name: Yup.string().required(),
  sciname: Yup.string().required(),
  time: Yup.string().required(),
  user: Yup.string().required(),
  description: Yup.string().required(),
  owner: Yup.string().required(),
});

export const AddSightingSchema = Yup.object({
  imagepath: Yup.string().required(),
  name: Yup.string().required(),
  sciname: Yup.string().required(),
  time: Yup.string().required(),
  userid: Yup.number().required(),
  description: Yup.string().required(),
  owner: Yup.string().required(),
  location: Yup.string().required(),
});

export const EditSightingSchema = Yup.object({
  id: Yup.number().required(),
  imagepath: Yup.string().url().required(),
  name: Yup.string().required(),
  sciname: Yup.string().required(),
  time: Yup.string().required(),
  userid: Yup.number().required(),
  description: Yup.string().required(),
  owner: Yup.string().required(),
});

export const AddCommentSchema = Yup.object({
  note: Yup.string().required(),
  owner: Yup.string().required(),
  sightingId: Yup.number().required(),
});
