import React from 'react';
import {  useSelector } from "react-redux";
import AdminArtistTable from '../../components/AdminTables/AdminArtistTable/adminArtistTable';
import AdminAlbumTable from '../../components/AdminTables/AdminAlbumTable/adminAlbumTable';
import AdminTrackTable from '../../components/AdminTables/AdminTrackTable/adminTrackTable';
import BackDrop from '../../components/UI/BackDrop/backDrop';
import TabsPanel from '../../components/UI/TabsPanel/tabsPanel'


const Admin = () => {
    const { loading } = useSelector(state => state.artists);
    return (
        <>
            <BackDrop loading={loading} />
            <TabsPanel
                titles={["Artists", "Albums", "Tracks"]}
                contents={[<AdminArtistTable />, <AdminAlbumTable />, <AdminTrackTable />]}
            />
        </>
    );
}

export default Admin;