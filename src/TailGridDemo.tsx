import React, { useState, useEffect } from "react";
import { TailGrid } from "../lib/components";
import { TailGridProps, FilterField, ActionConfig, ColumnConfig } from "@/types/tail-grid-types";
import { Edit, Trash, Eye, Download, Filter, RefreshCw, Sparkles, Mail, Phone, Building, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

// Define our user type
type User = {
    id: string;
    name: string;
    email: string;
    phone: string;
    company: string;
    role: string;
    status: 'active' | 'inactive' | 'pending';
    avatar?: string;
    createdAt: string;
    notes: string;
}

// Sample data generator function
const generateUsers = (count: number): User[] => {
    const roles = ['Developer', 'Designer', 'Product Manager', 'QA Engineer', 'DevOps'];
    const statuses: ('active' | 'inactive' | 'pending')[] = ['active', 'inactive', 'pending'];
    const companies = ['Acme Inc.', 'Globex Corp', 'Initech', 'Umbrella Corp', 'Stark Industries'];

    return Array.from({ length: count }, (_, i) => ({
        id: (i + 1).toString(),
        name: [
            'John Doe', 'Jane Smith', 'Bob Johnson', 'Alice Brown', 'Charlie Green',
            'Dave White', 'Eve Black', 'Frank Blue', 'Grace Yellow', 'Heidi Purple',
            'Ivan Orange', 'Judy Pink', 'Karl Grey', 'Laura Cyan', 'Mallory Magenta',
            'Niaj Brown', 'Olivia White', 'Peggy Black', 'Quentin Blue', 'Rupert Green',
            'Sybil Yellow', 'Trent Orange', 'Uma Purple', 'Victor Red', 'Walter Grey',
            'Xena Pink', 'Yara Cyan', 'Zane Magenta'
        ][i % 28],
        email: `user${i + 1}@example.com`,
        phone: `${Math.floor(100 + Math.random() * 900)}-${Math.floor(100 + Math.random() * 900)}-${Math.floor(1000 + Math.random() * 9000)}`,
        company: companies[i % companies.length],
        role: roles[i % roles.length],
        status: statuses[i % statuses.length],
        createdAt: new Date(Date.now() - (Math.random() * 90 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
        notes: `Additional notes for user ${i + 1}. This contains extended information that might be useful for reference.`
    }));
};

const TailGridDemo: React.FC = () => {
    const users = generateUsers(50);
    const [activeTab, setActiveTab] = useState("basic");
    const [selectedDemo, setSelectedDemo] = useState<string | null>(null);

    // Handle showing toast notifications for actions
    const handleAction = (action: string, row: User) => {
        toast(`${action} User`, {

            description: `Performed ${action.toLowerCase()} action on ${row.name}`,
        });
        console.log(`${action} action:`, row);
    };

    // Basic actions configuration
    const basicActions: ActionConfig<User>[] = [
        {
            label: 'Edit',
            icon: 'edit',
            component: (row) => <Edit size={18} onClick={() => handleAction('Edit', row)} />,
            onClick: (row) => handleAction('Edit', row)
        },
        {
            label: 'Delete',
            icon: 'trash',
            component: (row) => <Trash size={18} className="text-red-500" onClick={() => handleAction('Delete', row)} />,
            onClick: (row) => handleAction('Delete', row)
        }
    ];

    // Advanced actions configuration
    const advancedActions: ActionConfig<User>[] = [
        {
            label: 'View',
            icon: 'eye',
            component: (row) => <Eye size={18} className="text-blue-500" onClick={() => handleAction('View', row)} />,
            onClick: (row) => handleAction('View', row)
        },
        {
            label: 'Edit',
            icon: 'edit',
            component: (row) => <Edit size={18} className="text-amber-500" onClick={() => handleAction('Edit', row)} />,
            onClick: (row) => handleAction('Edit', row)
        },
        {
            label: 'Delete',
            icon: 'trash',
            component: (row) => <Trash size={18} className="text-red-500" onClick={() => handleAction('Delete', row)} />,
            onClick: (row) => handleAction('Delete', row)
        },
        {
            label: 'Export',
            icon: 'download',
            component: (row) => <Download size={18} className="text-green-500" onClick={() => handleAction('Export', row)} />,
            onClick: (row) => handleAction('Export', row)
        }
    ];

    // Basic columns configuration
    const basicColumns = [
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
        }
    ];

    // Advanced columns with custom rendering
    const advancedColumns: ColumnConfig<User>[] = [
        {
            key: 'name',
            header: 'Name',
            sortable: true,
            render: (value: unknown, row: User) => (
                <div className="flex items-center gap-3">
                    <Avatar>
                        <AvatarImage src={`/api/placeholder/32/32`} alt={row.name} />
                        <AvatarFallback>{row.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                        <div className="font-medium">{row.name}</div>
                        <div className="text-xs text-muted-foreground">{row.role}</div>
                    </div>
                </div>
            )
        },
        {
            key: 'email',
            header: 'Contact',
            sortable: true,
            render: (value: unknown, row: User) => (
                <div className="space-y-1">
                    <div className="flex items-center gap-1 text-sm">
                        <Mail size={14} className="text-muted-foreground" />
                        <span>{row.email}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                        <Phone size={14} className="text-muted-foreground" />
                        <span>{row.phone}</span>
                    </div>
                </div>
            )
        },
        {
            key: 'company',
            header: 'Company',
            sortable: true,
            render: (value: unknown, row: User) => (
                <div className="flex items-center gap-2">
                    <Building size={16} className="text-muted-foreground" />
                    <span>{row.company}</span>
                </div>
            )
        },
        {
            key: 'status',
            header: 'Status',
            sortable: true,
            render: (value: unknown, row: User) => {
                const statusColors = {
                    active: 'bg-green-100 text-green-800',
                    inactive: 'bg-red-100 text-red-800',
                    pending: 'bg-amber-100 text-amber-800'
                };

                return (
                    <Badge variant="outline" className={`${statusColors[row.status]} border-0`}>
                        {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
                    </Badge>
                );
            }
        },
        {
            key: 'createdAt',
            header: 'Created',
            sortable: true,
        }
    ];

    // Filter fields for the table
    const filterFields: FilterField[] = [
        {
            key: 'status',
            label: 'Status',
            type: 'select',
            options: [
                { value: 'active', label: 'Active' },
                { value: 'inactive', label: 'Inactive' },
                { value: 'pending', label: 'Pending' },
            ],
            icon: 'filter',
        },
        {
            key: 'role',
            label: 'Role',
            type: 'select',
            options: [
                { value: 'Developer', label: 'Developer' },
                { value: 'Designer', label: 'Designer' },
                { value: 'Product Manager', label: 'Product Manager' },
                { value: 'QA Engineer', label: 'QA Engineer' },
                { value: 'DevOps', label: 'DevOps' },
            ],
            icon: 'user',
        },
        {
            key: 'name',
            label: 'Name',
            type: 'text',
            placeholder: 'Search by name',
            icon: 'search',
        },
    ];

    // Custom filter component
    const customFilterComponent = (
        <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Filter size={14} />
                <span>Filters</span>
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
                <RefreshCw size={14} />
                <span>Refresh</span>
            </Button>
            <Button size="sm" className="flex items-center gap-1 bg-primary">
                <Sparkles size={14} />
                <span>AI Suggest</span>
            </Button>
        </div>
    );

    // Demo configurations
    const demos = {
        basic: {
            title: "Basic TailGrid",
            subtitle: "Simple data table with standard features",
            config: {
                initialData: users.slice(0, 10),
                columns: basicColumns,
                actions: basicActions,
                title: "Team Members",
                subtitle: "Manage your team members",
                sortable: true,
                pagination: true,
                hasFilterCapability: true,
            } as TailGridProps<User>
        },

        advanced: {
            title: "Advanced TailGrid",
            subtitle: "Custom rendering, multiple actions, and enhanced filtering",
            config: {
                initialData: users,
                columns: advancedColumns,
                actions: advancedActions,
                filterFields: filterFields,
                customFilterComponent: customFilterComponent,
                title: "Team Management Dashboard",
                subtitle: "Comprehensive team member management system",
                sortable: true,
                pagination: true,
                hasFilterCapability: true,
                containerClassName: "rounded-xl border-0 shadow-lg",
                headerClassName: "bg-slate-50 dark:bg-slate-900",
                bodyClassName: "divide-y",
                rowClassName: "hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors",
                highlightOnHover: true,
                stickyHeader: true,
            } as TailGridProps<User>
        },

        expandable: {
            title: "Expandable Rows",
            subtitle: "Click on rows to reveal additional information",
            config: {
                initialData: users.slice(0, 15),
                columns: basicColumns,
                actions: basicActions,
                title: "Expandable Team Data",
                subtitle: "Click on a row to see more details",
                expandableConfig: {
                    enabled: true,
                    renderExpandedContent: (row: User) => (
                        <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg space-y-2">
                            <h3 className="text-lg font-semibold">Additional Details</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Role</p>
                                    <p>{row.role}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Status</p>
                                    <p>{row.status}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Created</p>
                                    <p>{row.createdAt}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Notes</p>
                                    <p>{row.notes}</p>
                                </div>
                            </div>
                        </div>
                    ),
                },
                sortable: true,
                pagination: true,
            } as TailGridProps<User>
        },

        virtualized: {
            title: "Virtualized Table",
            subtitle: "Efficient rendering for large datasets",
            config: {
                initialData: generateUsers(1000), // Generate a larger dataset
                columns: basicColumns,
                actions: basicActions,
                title: "Large Dataset (1000 rows)",
                subtitle: "Virtualized for performance",
                virtualized: true,
                rowHeight: 56,
                maxHeight: 500,
                sortable: true,
                pagination: true,
            } as TailGridProps<User>
        },

        serverSide: {
            title: "Server-Side Processing",
            subtitle: "Data fetching, filtering, and sorting on the server",
            config: {
                columns: advancedColumns,
                actions: basicActions,
                title: "Server-Side Data",
                subtitle: "Remote data processing demonstration",
                isServerSide: true,
                onDataFetch: async (page: number, pageSize: number) => {
                    // Simulate server-side data fetching with delay
                    await new Promise(resolve => setTimeout(resolve, 1000));

                    const start = (page - 1) * pageSize;
                    const end = start + pageSize;
                    const items = users.slice(start, end);

                    return {
                        items,
                        totalCount: users.length,
                        totalPages: Math.ceil(users.length / pageSize),
                    };
                },
                onServerFilter: async () => {
                    await new Promise(resolve => setTimeout(resolve, 500));
                    console.log("Server-side filtering triggered");
                },
                onServerSort: async () => {
                    await new Promise(resolve => setTimeout(resolve, 500));
                    console.log("Server-side sorting triggered");
                },
                onServerSearch: async () => {
                    await new Promise(resolve => setTimeout(resolve, 500));
                    console.log("Server-side search triggered");
                },
                sortable: true,
                pagination: true,
                hasFilterCapability: true,
                filterFields: filterFields,
            } as TailGridProps<User>
        },

        themed: {
            title: "Custom Themed Table",
            subtitle: "Highly customized appearance",
            config: {
                initialData: users.slice(0, 12),
                columns: advancedColumns,
                actions: advancedActions,
                title: "Themed Data Explorer",
                subtitle: "Showcase of custom styling capabilities",
                containerClassName: "bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950 dark:to-purple-950 rounded-xl shadow-xl border-0 overflow-hidden",
                headerClassName: "bg-gradient-to-r from-indigo-500 to-purple-500 text-white",
                bodyClassName: "divide-y divide-indigo-100 dark:divide-indigo-900",
                rowClassName: "transition-all hover:bg-white dark:hover:bg-slate-800 hover:shadow-md",
                cellClassName: "py-4",
                headerCellClassName: "text-white font-medium py-4",
                footerClassName: "bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900",
                sortable: true,
                pagination: true,
                hasFilterCapability: true,
                filterFields: filterFields,
            } as TailGridProps<User>
        }
    };

    // Selection handling
    useEffect(() => {
        if (activeTab !== 'all' && !selectedDemo) {
            setSelectedDemo(activeTab);
        }
    }, [activeTab, selectedDemo]);

    return (
        <div className="container mx-auto py-8 space-y-8">
            <div className="text-center space-y-2 mb-8">
                <h1 className="text-3xl font-bold">TailGrid Showcase</h1>
                <p className="text-muted-foreground">A comprehensive demonstration of TailGrid capabilities</p>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-7 w-full">
                    <TabsTrigger value="basic">Basic</TabsTrigger>
                    <TabsTrigger value="advanced">Advanced</TabsTrigger>
                    <TabsTrigger value="expandable">Expandable</TabsTrigger>
                    <TabsTrigger value="virtualized">Virtualized</TabsTrigger>
                    <TabsTrigger value="serverSide">Server-side</TabsTrigger>
                    <TabsTrigger value="themed">Themed</TabsTrigger>
                    <TabsTrigger value="all">All Demos</TabsTrigger>
                </TabsList>

                {Object.entries(demos).map(([key, demo]) => (
                    <TabsContent key={key} value={key} className="mt-6">
                        <TailGrid {...demo.config} />
                    </TabsContent>
                ))}

                <TabsContent value="all" className="mt-6 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {Object.entries(demos).map(([key, demo]) => (
                            <Card key={key} className="overflow-hidden">
                                <CardHeader className="bg-slate-50 dark:bg-slate-900">
                                    <CardTitle>{demo.title}</CardTitle>
                                    <CardDescription>{demo.subtitle}</CardDescription>
                                </CardHeader>
                                <CardContent className="p-4">
                                    <p className="text-sm text-muted-foreground mb-4">
                                        {key === 'basic' && "Standard implementation with basic features"}
                                        {key === 'advanced' && "Enhanced visualization with custom rendering"}
                                        {key === 'expandable' && "Interactive rows that expand to show more details"}
                                        {key === 'virtualized' && "Optimized for rendering thousands of rows efficiently"}
                                        {key === 'serverSide' && "Handles data processing on the server side"}
                                        {key === 'themed' && "Showcase of extensive styling possibilities"}
                                    </p>
                                </CardContent>
                                <CardFooter className="bg-slate-50 dark:bg-slate-900 flex justify-end p-3">
                                    <Button
                                        onClick={() => {
                                            setSelectedDemo(key);
                                            window.scrollTo({
                                                top: 0,
                                                behavior: 'smooth'
                                            });
                                        }}
                                    >
                                        View Demo
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>

                    {selectedDemo && (
                        <div className="pt-12 border-t">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h2 className="text-2xl font-bold">{demos[selectedDemo as keyof typeof demos].title}</h2>
                                    <p className="text-muted-foreground">{demos[selectedDemo as keyof typeof demos].subtitle}</p>
                                </div>
                                <Button variant="outline" onClick={() => setSelectedDemo(null)}>
                                    Close Demo
                                </Button>
                            </div>
                            <TailGrid {...demos[selectedDemo as keyof typeof demos].config} />
                        </div>
                    )}
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default TailGridDemo;