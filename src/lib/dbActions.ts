'use server';

import { Bird, Stuff, Condition, Sighting } from '@prisma/client';
import { hash } from 'bcrypt';
import { redirect } from 'next/navigation';
import { prisma } from './prisma';

/**
 * Adds a new stuff to the database.
 * @param stuff, an object with the following properties: name, quantity, owner, condition.
 */
export async function addStuff(stuff: { name: string; quantity: number; owner: string; condition: string }) {
  // console.log(`addStuff data: ${JSON.stringify(stuff, null, 2)}`);
  let condition: Condition = 'good';
  if (stuff.condition === 'poor') {
    condition = 'poor';
  } else if (stuff.condition === 'excellent') {
    condition = 'excellent';
  } else {
    condition = 'fair';
  }
  await prisma.stuff.create({
    data: {
      name: stuff.name,
      quantity: stuff.quantity,
      owner: stuff.owner,
      condition,
    },
  });
  // After adding, redirect to the list page
  redirect('/list');
}

/**
 * Edits an existing stuff in the database.
 * @param stuff, an object with the following properties: id, name, quantity, owner, condition.
 */
export async function editStuff(stuff: Stuff) {
  // console.log(`editStuff data: ${JSON.stringify(stuff, null, 2)}`);
  await prisma.stuff.update({
    where: { id: stuff.id },
    data: {
      name: stuff.name,
      quantity: stuff.quantity,
      owner: stuff.owner,
      condition: stuff.condition,
    },
  });
  // After updating, redirect to the list page
  redirect('/list');
}

/**
 * Deletes an existing stuff from the database.
 * @param id, the id of the stuff to delete.
 */
export async function deleteStuff(id: number) {
  // console.log(`deleteStuff id: ${id}`);
  await prisma.stuff.delete({
    where: { id },
  });
  // After deleting, redirect to the list page
  redirect('/list');
}

/**
 * Adds a new Bird to the database.
 * @param bird, an object with the following properties: name, sciname, time, user, description
 */
export async function addBird(
  bird: {
    imagepath: string; name: string; sciname: string; time: string; user: string; description: string; },
) {
  await prisma.bird.create({
    data: {
      imagepath: bird.imagepath,
      name: bird.name,
      sciname: bird.sciname,
      description: bird.description,
    },
  });
  redirect('/list');
}

/**
 * Edits an existing Bird in the database.
 * @param bird, an object with the following properties: name, sciname, time, user, description
 */
export async function editBird(bird: Bird) {
  await prisma.bird.update({
    where: { id: bird.id },
    data: {
      id: bird.id,
      imagepath: bird.imagepath,
      name: bird.name,
      sciname: bird.sciname,
      description: bird.description,
    },
  });
  redirect('/list');
}

/**
 * Deletes an existing Bird from the database.
 * @param id, the id of the Bird to delete.
 */
export async function deleteBird(id: number) {
  // console.log(`deleteStuff id: ${id}`);
  await prisma.bird.delete({
    where: { id },
  });
  // After deleting, redirect to the list page
  redirect('/list');
}

/**
 * Adds a new Sighting to the database.
 * @param sighting, has the following properties: id, imagepath, name, sciname, time, user, description, owner
 */
export async function addSighting(
  sighting: {
    id: number;
    imagepath: string;
    name: string; sciname: string; time: string; userid: number; description: string; owner: string;},
) {
  await prisma.sighting.create({
    data: {
      id: sighting.id,
      imagepath: sighting.imagepath,
      name: sighting.name,
      sciname: sighting.sciname,
      time: sighting.time,
      userid: sighting.userid,
      description: sighting.description,
      owner: sighting.owner,
    },
  });
  redirect('/list');
}

/**
 * Edits an existing Sighting in the database.
 * @param sighting, has the following properties: id, imagepath, name, sciname, time, user, description, owner
 */
export async function editSighting(sighting: Sighting) {
  await prisma.sighting.update({
    where: { id: sighting.id },
    data: {
      id: sighting.id,
      imagepath: sighting.imagepath,
      name: sighting.name,
      sciname: sighting.sciname,
      time: sighting.time,
      userid: sighting.userid,
      description: sighting.description,
      owner: sighting.owner,
    },
  });
  redirect('/list');
}

/**
 * Deletes an existing Sighting from the database.
 * @param id, the id of the Bird to delete.
 */
export async function deleteSighting(id: number) {
  // console.log(`deleteStuff id: ${id}`);
  await prisma.sighting.delete({
    where: { id },
  });
  // After deleting, redirect to the list page
  redirect('/list');
}

/**
 * Creates a new user in the database.
 * @param credentials, an object with the following properties: username, email, password.
 */
export async function createUser(credentials: { email: string; password: string }) {
  // console.log(`createUser data: ${JSON.stringify(credentials, null, 2)}`);
  const password = await hash(credentials.password, 10);
  await prisma.user.create({
    data: {
      email: credentials.email,
      password,
    },
  });
}

/**
 * Changes the password of an existing user in the database.
 * @param credentials, an object with the following properties: email, password.
 */
export async function changePassword(credentials: { email: string; password: string }) {
  // console.log(`changePassword data: ${JSON.stringify(credentials, null, 2)}`);
  const password = await hash(credentials.password, 10);
  await prisma.user.update({
    where: { email: credentials.email },
    data: {
      password,
    },
  });
}
