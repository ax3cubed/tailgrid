// TailGrid.stories.tsx

import { StoryFn, Meta } from '@storybook/react';
import  TailGrid  from './TailGrid';

export default {
    title: 'TailGrid',
    component: TailGrid,
} as Meta<typeof TailGrid>;

const Template: StoryFn<typeof TailGrid> = (args) => <TailGrid {...args} />;


export const TailGridTest = Template.bind({});
TailGridTest.args = {
 actions: [],
 columns: [
    {
        key: 'name',
        header: 'Name',
        sortable: true,
    },
    {
        key: 'email',
        header: 'Email',
        sortable: true,
    },
    {
        key: 'phone',
        header: 'Phone',
        sortable: true,
    },
    {
        key: 'company',
        header: 'Company',
        sortable: true,
    },
],
initialData: [
    {
        id: '1',
        name: 'John Doe',
        email: '',
        phone: '123-456-7890',
        company: 'Acme Inc.',
    },
    {
        id: '2',
        name: 'Jane Smith',
        email: 'johndoemail.com',
        phone: '123-456-7890',
        company: 'Acme Inc.',
    },
],
filterFields: [],
title: 'TailGrid Test',
subtitle: 'This is a test of the TailGrid component',

};

