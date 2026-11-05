<p></p><div class="separator" style="clear: both; text-align: center;"><a href="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEijqP3WPwnzyUFnG33VIED-YnMQZZ_wsJZJHufpVGL4tTVlIs_DvYDcq32Wu1OUqC-dpoBdEeKmni7VbG_PBk8scG94d2eB2FsIYv-YiQOtGGhRitZX3CMiLMZlngmeWVqpFoS7AM8M952zgwqmFqf07K4dzPN1gbA4d8hqaXQ3eeXZ6KQYLIXM6Ye1lg/s265/scr_preview_darwin.jpg" style="clear: left; float: left; margin-bottom: 1em; margin-right: 1em;"><img border="0" data-original-height="160" data-original-width="265" height="160" src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEijqP3WPwnzyUFnG33VIED-YnMQZZ_wsJZJHufpVGL4tTVlIs_DvYDcq32Wu1OUqC-dpoBdEeKmni7VbG_PBk8scG94d2eB2FsIYv-YiQOtGGhRitZX3CMiLMZlngmeWVqpFoS7AM8M952zgwqmFqf07K4dzPN1gbA4d8hqaXQ3eeXZ6KQYLIXM6Ye1lg/s1600/scr_preview_darwin.jpg" width="265" /></a></div><br />&nbsp;<p></p><ol><li><p>Darwin 8.0.1 (corresponding to Mac OS X 10.4) seems to be the latest
        available full installer image, at least, until the <a href="http://www.puredarwin.org/">PureDarwin</a> project produces a new
        one.

        </p><ul><li><p>List of available <a href="http://www.opensource.apple.com/static/iso/">ISO images</a>

        </p></li></ul>

    </li><li><p>More recent versions of packages are available in source form:

        </p><ul><li><p><a href="http://opensource.apple.com/">Open Source</a> website
                (links by OS release)

            </p></li><li><p>Full <a href="http://www.opensource.apple.com/tarballs">list
                of packages</a> (some aren't linked under any OS release)

        </p></li></ul>

</li></ol>


<h4 id="installing" style="text-align: left;">Installing</h4>

<ol><li><p>Download and extract installation CD image:

        </p><ul><li><p><a href="http://www.opensource.apple.com/static/iso/darwinx86-801.iso.gz">Darwin
                8.0.1</a> (was under “Darwin 8.0.1 Installer CD” on old website)

                </p><ul><li><p><span class="smaller">MD5:
                        dbd260dda994093a11c31afbe624aa34</span>

                    </p></li><li><p><span class="smaller">SHA-256:
                        a26f9f14795fe0687bd647d41b712464c9a61430736fae4aa0fdb89207e1a62a</span>

                </p></li></ul>

            </li><li><p><code>$ gunzip darwinx86-801.iso.gz</code>

        </p></li></ul>

    </li><li><p>Set up <a href="http://www.qemu.org/">QEMU</a> VM:

        </p><ul><li><p><code>$ qemu-img create -f qcow2 <span class="variable"><span class="variable">darwin.qcow2</span></span> <span class="variable"><span class="variable">10G</span></span></code>

        </p></li></ul>

    </li><li><p>Start VM:

        </p><ul><li><p><code>$ qemu -net none -drive file=<span class="variable"><span class="variable">darwin.qcow2</span></span>,cache=writeback -cdrom
                darwinx86-801.iso -boot d</code>

            </p></li><li><p>Other useful qemu options: <code>-m 512</code> and <code>-enable-kqemu</code>

        </p></li></ul>

    </li><li><p>Installation steps:

        </p><ul><li><p>First boot:

                </p><ul><li><p>Select disk

                </p></li></ul>

                <ul><li><p>"<code>2</code>" (manual partitioning)

                    </p></li><li><p>"<code>y</code>" (initialize MBR)

                    </p></li><li><p>In fdisk:

                        </p><ul><li><p><code>&gt; auto hfs</code>

                            </p></li><li><p>Ignore the warning

                            </p></li><li><p><code>&gt; update</code>

                            </p></li><li><p><code>&gt; write</code>

                            </p></li><li><p><code>&gt; quit</code>

                        </p></li></ul>

                    </li><li><p>Enter partition name

                    </p></li><li><p>"<code>yes</code>" (clean install)

                    </p></li><li><p>"<code><span class="variable">darwin</span></code>"
                        (volume name)

                    </p></li><li><p>Continue (reboot)

                </p></li></ul>

            </li><li><p>Second boot (make sure to boot from CD again):

                </p><ul><li><p>Select disk

                    </p></li><li><p>"<code>3</code>" (existing partition)

                    </p></li><li><p>Enter partition name

                    </p></li><li><p>"<code>hfs</code>" (HFS+ filesystem)

                    </p></li><li><p>"<code>yes</code>" (clean install)

                    </p></li><li><p>"<code><span class="variable">darwin</span></code>"
                        (volume name)

                    </p></li><li><p>Wait for installation to complete...

                    </p></li><li><p>Enter root password

                    </p></li><li><p>"<code><span class="variable">darwin</span></code>"
                        (hostname)

                    </p></li><li><p>"<code>3</code>" (spawn shell)

                    </p></li><li><p><code># halt</code>

                </p></li></ul>

        </li></ul>

    </li><li><p>Configure VM for normal startup:

        </p><ul><li><p>Remove QEMU flags <code>-cdrom darwinx86-801.iso -boot d</code>

        </p></li></ul>

</li></ol>


<h4 id="basic-configuration" style="text-align: left;">Basic configuration</h4>

<h4 id="enable-vm-networking" style="text-align: left;">Enable VM networking</h4>

<ul><li><p>Change QEMU flags: <code>-net none</code> → <code>-net
        nic,model=rtl8139 -net user</code>

</p></li></ul>

<h4 id="ssh-access" style="text-align: left;">SSH access</h4>

<ol><li><p>Change QEMU flags: <code>-net user</code> → <code>-net
        user,hostfwd=tcp:127.0.0.1:<span class="variable">10022</span>-:22</code>
        (pick any port instead of <span class="variable">10022</span>)

    </p></li><li><p>Log in to VM, enable SSH:

        </p><ul><li><p><code># service ssh start</code>

        </p></li></ul>

    </li><li><p>Connect to VM with

        </p><ul><li><p><code>$ ssh -p <span class="variable">10022</span>
                root@localhost</code>

        </p></li></ul>

    </li><li><p>Optionally add an alias to host <code>~/.ssh/config</code> to
        simplify connecting:

        </p><ul><li><pre class="listing">Host <span class="variable">darwin-vm</span>
HostName localhost
Port <span class="variable">10022</span>
User root</pre>

            </li><li><p>Connect to VM with

                </p><ul><li><p><code>ssh darwin-vm</code>

                </p></li></ul>

        </li></ul>

    </li><li><p>Install public key to simplify logging in:

        </p><ul><li><p><code>$ cat .ssh/id_rsa.pub | ssh <span class="variable">darwin-vm</span>
                'mkdir .ssh; cat &gt;&gt;.ssh/authorized_keys'</code>

        </p></li></ul>

    </li><li><p>Add <code>-nographic</code> to QEMU flags to disable console window,
        which is no longer required

</p></li></ol>

<h4 id="some-familiar-aliases" style="text-align: left;">Some familiar aliases</h4>

<ul><li><p><code># echo "alias ll='ls -l'" &gt;&gt;/etc/bashrc</code>

    </p></li><li><p><code># echo "alias la='ls -lA'" &gt;&gt;/etc/bashrc</code>

</p></li></ul>

<h4 id="timezone" style="text-align: left;">Timezone</h4>

<ul><li><p><code># ln -sf /usr/share/zoneinfo/UTC /etc/localtime</code>

</p></li></ul>

<h4 id="temporary-filesystem" style="text-align: left;">Temporary filesystem</h4>

<p>Using a temporary disk image to build software helps keep the main disk image
file smaller.

</p><ol><li><p><code>$ qemu-img create -f qcow2 <span class="variable">scratch.qcow2</span>
        <span class="variable">10G</span></code>

    </p></li><li><p>Add QEMU flag: <code>-drive file=<span class="variable">scratch.qcow2</span>,cache=writeback</code>
        and boot

    </p></li><li><p>Figure out which disk number corresponds to the scratch drive:

        </p><ul><li><p><code># mount</code>

            </p></li><li><p><code># ls /dev/rdisk*</code>

            </p></li><li><p>It's the one that isn't mounted and doesn't have any
                partitions (s<span class="variable">n</span>-suffixed files)

            </p></li><li><p>It's usually, but not always, <span class="variable">/dev/rdisk1</span>

        </p></li></ul>

    </li><li><p><code># newfs_hfs -v scratch <span class="variable">/dev/rdisk1</span></code>

    </p></li><li><p><code># reboot</code>

    </p></li><li><p>Available as <code>/Volumes/scratch</code> on next boot

</p></li></ol>


<h4 id="notes" style="text-align: left;">Notes</h4>

<ol><li><p>The VM sometimes fails to boot with&nbsp;"<code>panic(...):
        nfs_boot_init failed</code>"; if this happens, restart it.

</p></li></ol>


<h4 id="updating-the-system" style="text-align: left;">Updating the system</h4>

<h4 id="kernel-xnu" style="text-align: left;">Kernel (xnu)</h4>

<ul><li><p>It breaks support for FAT (and thus the QEMU virtual FAT drive)

        </p><ul><li><p>Support for FAT is in the <span class="keyword">msdosfs</span>
                package which requires Xcode to build

            </p></li><li><p>An alternative to the virtual FAT drive for transferring
                files is writing tar archives directly to an unpartitioned drive

            </p></li><li><p>SSH scp is another alternative

        </p></li></ul>

    </li><li><p>Requires:

        </p><ul><li><p>corresponding <span class="keyword">cctools</span> (e.g.
                initially installed version or <span class="filename">cctools-590.42.1</span>,
                but not <span class="filename">cctools-667.3</span>)

            </p></li><li><p><span class="keyword">gcc 3.3</span> (revert if changed with <code>gcc_select
                3.3</code>)

        </p></li></ul>

    </li><li><p>Source package: <a href="http://www.opensource.apple.com/tarballs/xnu/xnu-792.6.76.tar.gz">xnu-792.6.76.tar.gz</a>
        (update to version listed under “Mac OS X 10.4.3”)

        </p><ul><li><p><span class="smaller">MD5: 854f44519778e8bde4283e275ed154e6</span>

            </p></li><li><p><span class="smaller">SHA-256:
                35c5ed2f1399c770583a229a733d064dc302ae6327a7fcb40996e1f3c474f568</span>

        </p></li></ul>

    </li><li><p>Building:

        </p><ul><li><p><code># cd /Volumes/scratch</code>

            </p></li><li><p><code># tar xzf <span class="variable">xnu-792.6.76.tar.gz</span></code>

            </p></li><li><p><code># cd xnu-792.6.76</code>

            </p></li><li><p>Patch to help build <span class="filename">gcc_42-5577</span>:

                </p><ul><li><p><code># sed -i.tmp 's/defined *(__i386__)/&amp; ||
                        defined(__x86_64__)/' bsd/{machine,sys}/*.h</code>

                </p></li></ul>

            </li><li><p><code># make DSTROOT= install</code>

        </p></li></ul>

    </li><li><p>Reboot. <code>uname -r</code> is now <span class="variable">8.7.0</span>.

</p></li></ul>

<h4 id="standard-library-libc" style="text-align: left;">Standard library (Libc)</h4>

<ul><li><p>Requires updated <span class="keyword">xnu</span> (<span class="filename">xnu-792.6.761</span>).

    </p></li><li><p>Source package: <a href="http://opensource.apple.com/tarballs/Libc/Libc-391.2.10.tar.gz">Libc-391.2.10.tar.gz</a>
        (update to version listed under “Mac OS X 10.4.3”)

        </p><ul><li><p><span class="smaller">MD5: 7a1a08d1b68668fc41916d6cf39182a4</span>

            </p></li><li><p><span class="smaller">SHA-256:
                e90b78d310235544623f26c6f18e27b329b5bc778deab8e57332e8e90ab92f11</span>

        </p></li></ul>

    </li><li><p>Building:

        </p><ul><li><p><code># cd /Volumes/scratch</code>

            </p></li><li><p><code># tar xzf <span class="variable">Libc-391.2.10.tar.gz</span></code>

            </p></li><li><p><code># cd Libc-391.2.10</code>

            </p></li><li><p><code># sed -i.tmp s/NOTIFY_STATUS_OK/0/g
                gen/{asl.c,syslog.c}</code>

            </p></li><li><p>Patch to help build <span class="filename">gcc_42-5577</span>:

                </p><ul><li><p><code># sed -i.tmp 's/defined *(__i386__)/&amp; ||
                        defined(__x86_64__)/' include/machine/*.h</code>

                </p></li></ul>

            </li><li><p><code># make OBJROOT="$PWD"/obj install</code>

        </p></li></ul>

</li></ul>


<h4 id="upgrading-gcc" style="text-align: left;">Upgrading GCC</h4>

<h3 id="dyld">dyld</h3>

<ul><li><p>This is optional.

    </p></li><li><p>Source package: <a href="http://www.opensource.apple.com/tarballs/dyld/dyld-46.16.tar.gz">dyld-46.16.tar.gz</a>
        (under “Mac OS X 10.4.11.x86”)

        </p><ul><li><p><span class="smaller">MD5: a97d4d2a77b3e5f2ff9757007cae0596</span>

            </p></li><li><p><span class="smaller">SHA-256:
                cf753c3a2cef239b1334c56603b36d206f54d613daa078ce0f2d73c3e2a0dd82</span>

        </p></li></ul>

    </li><li><p>Makefile: <a href="https://rawgit.com/zholos/darwin/master/dyld.mk">dyld.mk</a>

        </p><ul><li><p>Darwin doesn't include Xcode, which is required to build this
                package. This makefile provides alternative build instructions.

        </p></li></ul>

    </li><li><p>Building:

        </p><ul><li><p><code># cd /Volumes/scratch</code>

            </p></li><li><p><code># tar xzf <span class="variable">dyld-46.16.tar.gz</span></code>

            </p></li><li><p><code># cd dyld-46.16</code>

            </p></li><li><p><code># sed -i.tmp '/case
                CPU_TYPE_X86_64:/,/break;/d;/__pthread_tsd_first/d' src/dyld.cpp</code>

            </p></li><li><p><code># ln -s libstdc++.a
                /usr/lib/gcc/i686-apple-darwin8/4.0.0/libstdc++-static.a</code>

            </p></li><li><p><code># bsdmake -f <span class="variable">dyld.mk</span>
                VERSION_DYLD=46 install</code>

        </p></li></ul>

</li></ul>

<h3 id="cctools">cctools</h3>

<ul><li><p>Choice of version:

        </p><ul><li><p><span class="filename">cctools-667.3</span>

                </p><ul><li><p>Too new to build <span class="keyword">xnu</span>.

                    </p></li><li><p>Source package: <a href="http://opensource.apple.com/tarballs/cctools/cctools-667.3.tar.gz">cctools-667.3.tar.gz</a>
                        (under “Mac OS X 10.5.8”)

                        </p><ul><li><p><span class="smaller">MD5:
                                518166e6ddbd0287bebee3d00fddee7d</span>

                            </p></li><li><p><span class="smaller">SHA-256:
                                1ba43a3d3bcf138a196e714666927c706857226adccf2e69db4f08e940631c0d</span>

                        </p></li></ul>

                </li></ul>

            </li><li><p><span class="filename">cctools-590.42.1</span>

                </p><ul><li><p>Too old to build <span class="keyword">gcc</span>.

                    </p></li><li><p>Source package: <a href="http://opensource.apple.com/tarballs/cctools/cctools-590.42.1.tar.gz">cctools-590.42.1.tar.gz</a>
                        (update to version listed under “Mac OS X 10.4.3”)

                        </p><ul><li><p><span class="smaller">MD5:
                                6d875c5483699fd0f1e150facae35256</span>

                            </p></li><li><p><span class="smaller">SHA-256:
                                61c86c4dc556daafbabebd8162bfbce8214843b218fefbd15c6c1ba03d225a10</span>

                        </p></li></ul>

                </li></ul>

        </li></ul>

    </li><li><p>Building:

        </p><ul><li><p><code># cd /Volumes/scratch</code>

            </p></li><li><p><code># tar xzf <span class="variable">cctools-667.3.tar.gz</span></code>

            </p></li><li><p><code># cd cctools-667.3</code>

            </p></li><li><p><code># sed -i.tmp
                '/install.*strip/{h;s/strip/seg_hack/gp;g;s/ -s / /;}'
                misc/Makefile</code>

            </p></li><li><p><code># sed -i.tmp s/ld_classic/ld/ ld/Makefile</code>

            </p></li><li><p><code># make install</code>

        </p></li></ul>

    </li><li><p>The new assembler will often show the warning&nbsp;"<code>indirect
        jmp without '*'</code>" on code generated by the old GCC.

</p></li></ul>

<h3 id="gcc">gcc</h3>

<ul><li><p>Choice of version:

        </p><ul><li><p><span class="filename">gcc_42-5577</span>

                </p><ul><li><p>Latests <span class="filename">gcc_42</span> package
                        (newer packages are named <span class="filename">gcc</span>).
                        GCC 4.2.1. Requires patched system include files, which
                        can be done when upgrading <span class="keyword">xnu</span>
                        and <span class="keyword">Libc</span> (see above).

                    </p></li><li><p>Source package: <a href="http://opensource.apple.com/tarballs/gcc_42/gcc_42-5577.tar.gz">gcc_42-5577.tar.gz</a>
                        (update to version listed under “Mac OS X 10.5.8”)

                        </p><ul><li><p><span class="smaller">MD5:
                                dab7ad45f76919f058a6f1cf3a0e91d8</span>

                            </p></li><li><p><span class="smaller">SHA-256:
                                fd6459ab701b41dc1297cdbc27f302c558d766505cfe8dd1d6ec0d257fef0e81</span>

                        </p></li></ul>

                </li></ul>

            </li><li><p><span class="filename">gcc_42-5531</span>

                </p><ul><li><p>Slightly older version. Doesn't require any changes
                        to include files.

                    </p></li><li><p>Source package: <a href="http://opensource.apple.com/tarballs/gcc_42/gcc_42-5531.tar.gz">gcc_42-5531.tar.gz</a>
                        (under “Mac OS X 10.5.8”)

                        </p><ul><li><p><span class="smaller">MD5:
                                959ecd224cea2477d57b1c3026fe05ee</span>

                            </p></li><li><p><span class="smaller">SHA-256:
                                924862e2092fa11754ec9226a0de4772d831c40500231728055d00d1bb3a632e</span>

                        </p></li></ul>

                </li></ul>

        </li></ul>

    </li><li><p>Requires <span class="filename">cctools-667.3</span> and optionally <span class="keyword">dyld</span>

        </p><ul><li><p>Building:

                </p><ul><li><p><code># cd /Volumes/scratch</code>

                    </p></li><li><p><code># tar xzf <span class="variable">gcc_42-5577.tar.gz</span></code>

                    </p></li><li><p><code># cd gcc_42-5577</code>

                    </p></li><li><p>If <span class="keyword">dyld</span> isn't upgraded,
                        patch to revert debugging format from DWARF to stabs:

                        </p><ul><li><p><code># sed -i.tmp 's/\(#define
                                PREFERRED_DEBUGGING_TYPE \).*/\1DBX_DEBUG/'
                                gcc/config/darwin.h</code>

                            </p></li><li><p><code># sed -i.tmp
                                '/darwin_macho_att_stub/s/Init.*//'
                                gcc/config/darwin.opt</code>

                        </p></li></ul>

                    </li><li><p><code># sed -i.tmp '/x86_64/s/|| exit 1//' build_gcc</code>

                    </p></li><li><p><code># ln -s true /usr/bin/dsymutil</code>

                    </p></li><li><p><code># gnumake RC_ARCHS=i386 install</code>

                        </p><ul><li><p>Don't try to set <code>DSTROOT=/</code>, it
                                deletes everything.

                        </p></li></ul>

                    </li><li><p><code># cp -pR dst/* /</code>

                    </p></li><li><p><code># cp -pR obj/dst-i686-i686/usr/lib/libgcc_s*
                        /usr/lib/gcc/i686-apple-darwin8/4.2.1/</code>

                </p></li></ul>

        </li></ul>

    </li><li><p>GCC is now installed as <span class="program">gcc-4.2</span>.
