import React, { useState, useEffect } from "react";
import Axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from "react-router-dom";
import NavbarComponent from "../../Components/Users/Navbar";
import { useToastHook } from "../../Components/CustomToast";
import AdminTransCardValidasiResepComponent from "../../Components/Admin/AdminTransCardValidasiResep";
import AdminTransCardMenungguPembayaranComponent from "../../Components/Admin/AdminTransCardMenungguPembayaran";
import AdminTransCardMenungguKonfirmasiComponent from "../../Components/Admin/AdminTransCardMenungguKonfirmasi";
import AdminTransCardDiprosesComponent from "../../Components/Admin/AdminTransCardDiproses";
import AdminTransCardDikirimComponent from "../../Components/Admin/AdminTransCardDikirim";
import AdminTransCardPesananDikonfirmasiComponent from "../../Components/Admin/AdminTransCardPesananDikonfirmasi";
import AdminTransCardDibatalkanComponent from "../../Components/Admin/AdminTransCardDibatalkan";
import Sidebar from "../../Components/Admin/Sidebar";
import { getTransactionAdminAction } from "../../Redux/Actions/transactionActions";
import {
    Box,
    Divider,
    VStack,
    Center,
    Stack,
    Image,
    Text,
    Button,
    ButtonGroup,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Input,
    InputGroup,
    InputLeftAddon,
    Select,
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel
} from "@chakra-ui/react";

import { TiArrowBack } from "react-icons/ti";
import { FaCircle } from "react-icons/fa";

const AdminTransactionListPage = (props) => {

    //* assign function
    const [currentToast, newToast] = useToastHook();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //^ STATE MANAGEMENT
    const [orderData, setOrderData] = useState("null");
    const [filterInvoiceNo, setFilterInvoiceNo] = useState("");
    const [filterDateBegin, setFilterDateBegin] = useState("");
    const [filterDateEnd, setFilterDateEnd] = useState("");
    const [tabIndex, setTabIndex] = useState(0);
    // const { state, search } = useLocation();

    //& component did mount
    useEffect(() => {
        { props.defaultTabIndex && setTabIndex(props.defaultTabIndex) }
        dispatch(getTransactionAdminAction());
    }, [])

    //TODO nanti ambil dr reducer transaksi
    const { transactionList } = useSelector((state) => {
        return {
            transactionList: state.transactionReducers.transactionAdminView
        }
    })

    const handleTabIndex = (idx) => {
        setTabIndex(idx);
    }

    //& untuk ambil BE transaksi yang terpaginate dan tersortir
    const handleSortDropdown = (sortValue) => {
        console.log(`dropdown yang terpilih ${sortValue}`);

        if (sortValue != "null") {
            setOrderData(sortValue);
            let property = sortValue.split('-')[0];
            let order = sortValue.split('-')[1];

            //TODO axios paginated sorted data here
        } else {
            // setOrderData(sortValue);
            newToast({
                description: "Reset urutan dengan mengklik tombol reset",
                status: 'warning'
            })
        }
    }

    const handleFilterSort = () => {

        //^check isi handle
        console.log(`isi filterDateBegin ${filterDateBegin}`);
        console.log(`isi filterDateEnd ${filterDateEnd}`);
        console.log(`isi filterInvoiceNo ${filterInvoiceNo}`);

        //TODO try catch axios untuk filter data
        let filterQuery = '?';

    }

    const handleReset = () => {
        //getTransaction();
        setFilterDateBegin('');
        setFilterDateEnd('');
        setFilterInvoiceNo('');
        setOrderData('');
    }

    return (
        <>
            <div
                className="container-fluid"
            >
                <div class="row">
                    <div class="col-md-3 col-sm-5">
                        <Sidebar />
                        <Text></Text>
                    </div>
                    <div class="col-md-9 col-sm-8">
                        <div class="row container mt-4">
                            <div
                                className="col-12 col-md-3 order-2 order-md-1 py-3"
                            >
                                <Box
                                    borderRadius={5}
                                    shadow="md"
                                    py={2}
                                    textAlign="left"
                                    className="font-brand"
                                >
                                    <Text
                                        py={2}
                                        ps={4}
                                        className="h6b"
                                    >
                                        Filter dan atau urutkan berdasarkan:
                                    </Text>
                                    <Divider
                                        className="d-none d-md-block"
                                    />
                                    <Box>
                                        <InputGroup size="sm">
                                            <InputLeftAddon children='Tanggal awal' width={150} />
                                            <Input
                                                type='date'
                                                value={filterDateBegin}
                                                onChange={(e) => setFilterDateBegin(e.target.value)}
                                            />
                                        </InputGroup>
                                        <InputGroup size="sm">
                                            <InputLeftAddon children='Tanggal akhir' width={150} />
                                            <Input
                                                type='date'
                                                value={filterDateEnd}
                                                onChange={(e) => setFilterDateEnd(e.target.value)}
                                            />
                                        </InputGroup>
                                        <InputGroup size="sm">
                                            <InputLeftAddon children='Nomor invoice' width={150} />
                                            <Input
                                                type='text'
                                                placeholder="Cari transaksimu disini" value={filterInvoiceNo}
                                                onChange={(e) => setFilterInvoiceNo(e.target.value)}
                                            />
                                        </InputGroup>
                                        <Select
                                            size="sm"
                                            alignItems="left"
                                            className="font-brand"
                                            variant="filled"
                                            value={orderData}
                                            onChange={(e) => handleSortDropdown(e.target.value)}
                                        >
                                            <option
                                                value="null"
                                            >
                                                Urutkan berdasarkan ...
                                            </option>
                                            <option
                                                value="invoiceNumber-asc"
                                            >
                                                Nomor Invoice - Ascending
                                            </option>
                                            <option
                                                value="invoiceNumber-desc"
                                            >
                                                Nomor Invoice - Descending
                                            </option>
                                            <option
                                                value="addDate-asc"
                                            >
                                                Tanggal Invoice - Ascending
                                            </option>
                                            <option
                                                value="addDate-dessc"
                                            >
                                                Tanggal Invoice - Descending
                                            </option>
                                        </Select>
                                        <Button
                                            mx={{ base: 2, md: 0 }}
                                            mt={{ base: 2, md: 2 }}
                                            width={{ base: 400, md: 300 }}
                                            className="btn-def"
                                            onClick={handleFilterSort}
                                        >
                                            Terapkan
                                        </Button>
                                        <Button
                                            mx={{ base: 2, md: 0 }}
                                            mt={{ base: 2, md: 2 }}
                                            width={{ base: 400, md: 300 }}
                                            className="btn-def"
                                            onClick={handleReset}
                                        >
                                            Reset
                                        </Button>
                                    </Box>
                                </Box>
                            </div>
                            <div
                                className="col-12 col-md-9 order-1 order-md-2"
                            >
                                <Text
                                    className="h3"
                                    pt={{ base: 2, md: 6 }}
                                    pb={{ base: 0, md: 4 }}
                                >
                                    Daftar Transaksi
                                </Text>
                                <Box
                                    shadow='md'
                                    borderRadius={5}
                                >
                                    <Tabs
                                        variant='soft-rounded'
                                        isFitted='true'
                                        className="font-brand"
                                        orientation={{ base: 'vertical', md: 'horizontal' }}
                                        defaultIndex={tabIndex}
                                        onChange={(e) => setTabIndex(e)}
                                    >
                                        <TabList>
                                            <Tab
                                                _selected={{
                                                    color: 'var(--colorOne)',
                                                    bg: 'var(--colorSix)',
                                                }}
                                            >
                                                Validasi Resep
                                            </Tab>
                                            <Tab
                                                _selected={{
                                                    color: 'var(--colorOne)',
                                                    bg: 'var(--colorSix)',
                                                }}
                                            >
                                                Menunggu Pembayaran
                                            </Tab>
                                            <Tab
                                                _selected={{
                                                    color: 'var(--colorOne)',
                                                    bg: 'var(--colorSix)',
                                                }}
                                            >
                                                Menunggu Konfirmasi
                                            </Tab>
                                            <Tab
                                                _selected={{
                                                    color: 'var(--colorOne)',
                                                    bg: 'var(--colorSix)',
                                                }}
                                            >
                                                Diproses
                                            </Tab>
                                            <Tab
                                                _selected={{
                                                    color: 'var(--colorOne)',
                                                    bg: 'var(--colorSix)',
                                                }}
                                            >
                                                Dikirim
                                            </Tab>
                                            <Tab
                                                _selected={{
                                                    color: 'var(--colorOne)',
                                                    bg: 'var(--colorSix)',
                                                }}
                                            >
                                                Pesanan Dikonfirmasi
                                            </Tab>
                                            <Tab
                                                _selected={{
                                                    color: 'var(--colorOne)',
                                                    bg: 'var(--colorSix)',
                                                }}
                                            >
                                                Dibatalkan
                                            </Tab>
                                        </TabList>
                                        <TabPanels>
                                            <TabPanel>
                                                <AdminTransCardValidasiResepComponent
                                                dbValidasiResep={transactionList.filter(val => val.transactionStatus == "Menunggu Diproses Penjual")}

                                                />
                                            </TabPanel>
                                            <TabPanel>
                                                <AdminTransCardMenungguPembayaranComponent
                                                dbMenungguPembayaran={transactionList.filter(val => val.transactionStatus == "Menunggu Pembayaran")}

                                                />
                                            </TabPanel>
                                            <TabPanel>
                                                <AdminTransCardMenungguKonfirmasiComponent
                                                dbMenungguKonfirmasi={transactionList.filter(val => val.transactionStatus == "Menunggu Konfirmasi")}

                                                />
                                            </TabPanel>
                                            <TabPanel>
                                                <AdminTransCardDiprosesComponent
                                                dbDiproses={transactionList.filter(val => val.transactionStatus == "Diproses")}

                                                />
                                            </TabPanel>
                                            <TabPanel>
                                                <AdminTransCardDikirimComponent
                                                dbDikirim={transactionList.filter(val => val.transactionStatus == "Dikirim")}

                                                />
                                            </TabPanel>
                                            <TabPanel>
                                                <AdminTransCardPesananDikonfirmasiComponent
                                                dbPesananDikonfirmasi={transactionList.filter(val => val.transactionStatus == "Pesanan Dikonfirmasi")}

                                                />
                                            </TabPanel>
                                            <TabPanel>
                                                <AdminTransCardDibatalkanComponent
                                                dbDibatalkan={transactionList.filter(val => val.transactionStatus == "Dibatalkan")}

                                                />
                                            </TabPanel>
                                        </TabPanels>
                                    </Tabs>
                                </Box>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminTransactionListPage;