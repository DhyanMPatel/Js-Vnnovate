import { cn } from "@/utils/functions";
import {
  AppstoreOutlined,
  CodeSandboxOutlined,
  FileDoneOutlined,
  FileOutlined,
  FileProtectOutlined,
  FileSyncOutlined,
  HomeOutlined,
  ImportOutlined,
  MinusSquareOutlined,
  OrderedListOutlined,
  PlusSquareOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
  SolutionOutlined,
  TeamOutlined,
  UngroupOutlined,
  UnorderedListOutlined,
  UserOutlined,
  UserSwitchOutlined,
  UsergroupAddOutlined,
  WalletOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { BiSolidDiscount } from "react-icons/bi";
import { BsBuildingFillGear } from "react-icons/bs";
import { CiShop } from "react-icons/ci";
import { FaBusinessTime } from "react-icons/fa";
import { GiTakeMyMoney, GiTicket } from "react-icons/gi";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { IoDocumentTextOutline } from "react-icons/io5";
import {
  MdAcUnit,
  MdOutlineAttachMoney,
  MdOutlineEditAttributes,
  MdOutlineInvertColors,
  MdShoppingCartCheckout,
} from "react-icons/md";
import { TbShoppingCartCog, TbTruckReturn } from "react-icons/tb";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Menu from "../../UI/Menu";
import usePermissions from "../../utils/usePermissions";
import SideNavLoader from "./SideNavLoader";

const SideNav = ({ collapsed, setCollapsed }) => {
  const { permissions } = usePermissions();
  const [isSetting, setIsSetting] = useState(false);
  const { loading } = useSelector((state) => state.auth);

  const { data } = useSelector((state) => state?.setting) || {};

  const menu = [
    Array.isArray(permissions) &&
      permissions.length > 0 && {
        label: (
          <NavLink to="/admin/dashboard">
            <span>DASHBOARD</span>
          </NavLink>
        ),
        key: "dashboard",
        icon: <HomeOutlined />,
      },

    {
      label: (
        <NavLink to="/admin/pos">
          <span>POS</span>
        </NavLink>
      ),
      permit: {
        permissions: ["create-saleInvoice", "readAll-saleInvoice"],
        operator: "or",
      },
      key: "pos",
      icon: <ShoppingCartOutlined />,
    },

    {
      label: "INVENTORY",
      key: "inventory",
      permit: {
        permissions: ["create-product", "readAll-product"],
        operator: "or",
      },
      icon: <CodeSandboxOutlined />,
      children: [
        {
          label: (
            <NavLink to="/admin/product">
              <span>Product</span>
            </NavLink>
          ),
          key: "products",
          icon: <UnorderedListOutlined />,
        },
        {
          label: (
            <NavLink to="/admin/product-sort-list">
              <span>Shortage Products</span>
            </NavLink>
          ),
          key: "productSortList",
          icon: <OrderedListOutlined />,
        },
      ],
    },

    {
      label: "PURCHASE",
      permit: {
        permissions: ["create-purchaseInvoice", "readAll-purchaseInvoice"],
        operator: "or",
      },
      key: "PURCHASE",
      icon: <PlusSquareOutlined />,
      children: [
        {
          label: (
            <NavLink to="/admin/purchase">
              <span>Purchase Invoice</span>
            </NavLink>
          ),
          key: "purchases",
          icon: <UnorderedListOutlined />,
        },
        {
          label: (
            <NavLink to="/admin/supplier">
              <span>Suppliers</span>
            </NavLink>
          ),
          key: "suppliers",
          icon: <UserOutlined />,
        },
        {
          label: (
            <NavLink to="/admin/purchase-return-list">
              <span>Purchase Return </span>
            </NavLink>
          ),
          key: "purchaseReturn",
          icon: <OrderedListOutlined />,
        },
        {
          label: (
            <NavLink to="/admin/purchase-reorder-invoice">
              <span>Purchase Order </span>
            </NavLink>
          ),
          key: "purchaseOrder",
          icon: <OrderedListOutlined />,
        },
      ],
    },
    {
      label: "SALE",
      permit: {
        permissions: ["create-saleInvoice", "readAll-saleInvoice"],
        operator: "or",
      },
      key: "SALE",
      icon: <MinusSquareOutlined />,
      children: [
        {
          label: (
            <NavLink to="/admin/sale">
              <span>Sale Invoice</span>
            </NavLink>
          ),
          key: "sells",
          icon: <UnorderedListOutlined />,
        },
        {
          label: (
            <NavLink to="/admin/customer">
              <span>Customers</span>
            </NavLink>
          ),
          key: "customers",
          icon: <UserOutlined />,
        },
        {
          label: (
            <NavLink to="/admin/sale-return-list">
              <span>Sale Return </span>
            </NavLink>
          ),
          key: "saleReturn",
          icon: <OrderedListOutlined />,
        },
      ],
    },

    {
      label: "ACCOUNTS",
      permit: {
        permissions: ["create-account", "readAll-account"],
        operator: "or",
      },
      key: "accounts",
      icon: <WalletOutlined />,
      children: [
        {
          label: (
            <NavLink to="/admin/account/">
              <span>Account</span>
            </NavLink>
          ),
          key: "accountList",
          icon: <UnorderedListOutlined />,
        },
        {
          label: (
            <NavLink to="/admin/transaction/">
              <span>Transaction</span>
            </NavLink>
          ),
          key: "transactionList",
          icon: <UnorderedListOutlined />,
        },
        {
          label: (
            <NavLink to="/admin/account/trial-balance">
              <span>Trial Balance</span>
            </NavLink>
          ),
          key: "trialBalance",
          icon: <FileDoneOutlined />,
        },
        {
          label: (
            <NavLink to="/admin/account/balance-sheet">
              <span>Balance Sheet</span>
            </NavLink>
          ),
          key: "balanceSheet",
          icon: <FileOutlined />,
        },
        {
          label: (
            <NavLink to="/admin/account/income">
              <span>Income Statement</span>
            </NavLink>
          ),
          key: "incomeStatement",
          icon: <FileSyncOutlined />,
        },
      ],
    },
    Array.isArray(permissions) &&
      permissions.length > 0 && {
        label: "REPORT",
        key: "report",
        icon: <IoDocumentTextOutline size={16} />,
        children: [
          {
            label: (
              <NavLink to="/admin/product-report">
                <span>Inventory Report</span>
              </NavLink>
            ),
            key: "productReport",
            icon: <FileSyncOutlined />,
          },
          {
            label: (
              <NavLink to="/admin/purchase-report">
                <span>Purchase Report</span>
              </NavLink>
            ),
            key: "purchaseReport",
            icon: <FileSyncOutlined />,
          },
          {
            label: (
              <NavLink to="/admin/sale-report">
                <span>Sale Report</span>
              </NavLink>
            ),
            key: "saleReport",
            icon: <FileSyncOutlined />,
          },
          {
            label: (
              <NavLink to="/admin/supplier-report">
                <span>Supplier Report</span>
              </NavLink>
            ),
            key: "supplierReport",
            icon: <FileSyncOutlined />,
          },
          {
            label: (
              <NavLink to="/admin/customer-report">
                <span>Customer Report</span>
              </NavLink>
            ),
            key: "customerReport",
            icon: <FileSyncOutlined />,
          },
          {
            label: (
              <NavLink to="/admin/payment-report">
                <span>Payment Report</span>
              </NavLink>
            ),
            key: "paymentReport",
            icon: <FileSyncOutlined />,
          },
        ],
      },
  ];

  const SettingMenu = [
    {
      label: (
        <NavLink to="/admin/company-setting">
          <span>Company settings</span>
        </NavLink>
      ),
      key: "invoiceSetting",
      icon: <BsBuildingFillGear />,
    },
    {
      label: "HR",
      permit: {
        permissions: ["create-user", "readAll-user"],
        operator: "or",
      },
      key: "hr",
      icon: <TeamOutlined />,
      children: [
        {
          label: (
            <NavLink to="/admin/hr/staffs">
              <span>Staffs</span>
            </NavLink>
          ),
          key: "staffs",
          icon: <UsergroupAddOutlined />,
        },
        {
          label: (
            <NavLink to="/admin/role">
              <span>Role & Permissions</span>
            </NavLink>
          ),
          key: "roleAndPermissions",
          icon: <UserSwitchOutlined />,
        },
        {
          label: (
            <NavLink to="/admin/designation/">
              <span>Designation</span>
            </NavLink>
          ),
          key: "designation",
          icon: <SolutionOutlined />,
        },
        {
          label: (
            <NavLink to="/admin/department/">
              <span>Department</span>
            </NavLink>
          ),
          key: "department",
          icon: <HiOutlineBuildingOffice2 />,
        },
        {
          label: (
            <NavLink to="/admin/shift/">
              <span>Shift</span>
            </NavLink>
          ),
          key: "shift",
          icon: <FaBusinessTime />,
        },
        {
          label: (
            <NavLink to="/admin/employment-status/">
              <span>Employment Status</span>
            </NavLink>
          ),
          key: "employmentStatus",
          icon: <FaBusinessTime />,
        },
      ],
    },
    {
      label: "Inventory",
      key: "inventory",
      icon: <TbShoppingCartCog />,
      children: [
        {
          label: (
            <NavLink to="/admin/product-category">
              <span>Product Category</span>
            </NavLink>
          ),
          key: "productCategory",
          icon: <AppstoreOutlined />,
        },
        {
          label: (
            <NavLink to="/admin/product-subcategory">
              <span>Product Subcategory</span>
            </NavLink>
          ),
          key: "productSubcategory",
          icon: <UngroupOutlined />,
        },
        {
          label: (
            <NavLink to="/admin/product-brand">
              <span>Product Brand</span>
            </NavLink>
          ),
          key: "productBrand",
          icon: <FileProtectOutlined />,
        },

        {
          label: (
            <NavLink to="/admin/product-color">
              <span>Product Color</span>
            </NavLink>
          ),
          key: "productColor",
          icon: <MdOutlineInvertColors />,
        },
        {
          label: (
            <NavLink to="/admin/product-attribute">
              <span>Product Attribute</span>
            </NavLink>
          ),
          key: "productAttribute",
          icon: <MdOutlineEditAttributes />,
        },

        {
          label: (
            <NavLink to="/admin/uom">
              <span>UoM</span>
            </NavLink>
          ),
          key: "UoM",
          icon: <MdAcUnit />,
        },
        {
          label: (
            <NavLink to="/admin/import-product">
              <span>Import Product </span>
            </NavLink>
          ),
          key: "import_csv",
          icon: <ImportOutlined />,
        },
        {
          label: (
            <NavLink to="/admin/print-page-setting">
              <span>Barcode page setting</span>
            </NavLink>
          ),
          key: "Barcode page setting",
        },
      ],
    },
    {
      label: "Others",
      key: "Others",
      icon: <SettingOutlined />,
      children: [
        {
          label: (
            <NavLink to="/admin/coupon">
              <span>Coupon</span>
            </NavLink>
          ),
          key: "coupon",
          icon: <GiTicket />,
        },
        {
          label: (
            <NavLink to="/admin/discount">
              <span>Discount</span>
            </NavLink>
          ),
          permit: {
            permissions: ["create-discount", "readAll-discount"],
            operator: "or",
          },
          key: "Discount",
          icon: <BiSolidDiscount />,
        },
        {
          label: (
            <NavLink to="/admin/currency">
              <span>Currency</span>
            </NavLink>
          ),
          permit: {
            permissions: ["create-currency", "readAll-currency"],
            operator: "or",
          },
          key: "Currency",
          icon: <MdOutlineAttachMoney />,
        },
        {
          label: (
            <NavLink to="/admin/vat-tax">
              <span>VAT/TAX</span>
            </NavLink>
          ),
          key: "VAT/TAX",
          icon: <SettingOutlined />,
        },
      ],
    },
  ];

  return (
    <div className="overflow-y-auto no-scrollbar h-[calc(100vh-100px)] pb-4">
      {loading ? (
        <SideNavLoader />
      ) : (
        <div className="relative">
          <div
            className={cn(
              `absolute w-full  transition-all duration-300 ${
                isSetting ? "left-[280px]" : "left-0"
              }`
            )}
          >
            <Menu
              items={menu}
              setCollapsed={setCollapsed}
              permissions={permissions}
              collapsed={collapsed}
            />
            {Array.isArray(permissions) && permissions.length > 0 && (
              <div
                className={cn(
                  "px-4 flex items-center justify-between font-Popins  hover:bg-[rgb(71,74,120)] py-3 cursor-pointer",
                  {
                    "flex items-center justify-center px-0 text-lg": collapsed,
                  }
                )}
                onClick={() => setIsSetting(true)}
              >
                <span className="flex items-center gap-1">
                  <SettingOutlined /> {!collapsed && "Settings"}
                </span>
                {!collapsed && <IoIosArrowForward />}
              </div>
            )}
          </div>

          <div
            className={cn(
              `absolute w-full  transition-all duration-300 ${
                isSetting ? "left-0" : "-left-[280px]"
              }`
            )}
          >
            <div
              className={cn(
                "px-4 flex items-center font-medium gap-1 font-Popins bg-[rgb(71,74,95)] hover:bg-[rgb(71,74,120)] py-3 cursor-pointer",
                {
                  "flex items-center justify-center text-lg": collapsed,
                }
              )}
              onClick={() => setIsSetting(false)}
            >
              <IoIosArrowBack /> {!collapsed && "Back to menu"}
            </div>
            <hr className=" border-gray-500" />
            <Menu
              items={SettingMenu}
              setCollapsed={setCollapsed}
              permissions={permissions}
              collapsed={collapsed}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SideNav;
